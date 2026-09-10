const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source=fs.readFileSync('account.html','utf8');
const signup=source.slice(source.indexOf('async function signup(){'),source.indexOf('async function sendReset(){'));
async function scenario({session,profileError=false}){
 const messages=[],redirects=[],calls=[];
 const fields={signupEmail:'test@example.invalid',signupPassword:'test-password-123',motherName:'Test',dueDateInput:'2027-02-01',babyName:'',cityInput:'Berlin',pregnancyType:'single',babyGender:'unknown'};
 const context={document:{getElementById:id=>({value:fields[id]})},currentLang:'fr',location:{href:'https://example.invalid/mama/account.html'},URL,window:{location:{}},t:()=>({missing:'missing',weakPassword:'weak',profileError:'profile error',signupSuccess:'success'}),showMessage:(type,text)=>messages.push([type,text]),authText:key=>key,calculatePregnancyWeek:()=>20,determineTheme:()=> 'neutral',setTimeout:fn=>redirects.push(fn),supabaseClient:{auth:{signUp:async args=>{calls.push(args);return{data:{user:{id:'fake'},session},error:null}}},from:()=>({select:()=>({eq:()=>({limit:async()=>({data:[],error:null})})}),insert:async()=>({error:profileError?{message:'failed'}:null})})}};
 vm.createContext(context);vm.runInContext(signup,context);await context.signup();return{messages,redirects,calls};
}
(async()=>{
 let r=await scenario({session:null});assert.equal(r.redirects.length,0);assert.deepEqual(r.messages.at(-1),['success','confirm']);assert.equal(r.calls[0].options.emailRedirectTo,'https://example.invalid/mama/account.html');
 r=await scenario({session:{},profileError:true});assert.equal(r.redirects.length,0);assert.deepEqual(r.messages.at(-1),['error','profile error']);
 r=await scenario({session:{}});assert.equal(r.redirects.length,1);assert.deepEqual(r.messages.at(-1),['success','success']);
 assert(source.includes('new URL("reset-password.html",window.location.href).href'));
 console.log('PASS: email confirmation does not redirect; profile failures stay visible; successful signup redirects; password reset preserves subpath.');
})().catch(e=>{console.error(e);process.exit(1)});
