from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import subprocess,json,sys
R=Path(__file__).resolve().parent.parent
errors=[];scripts=[];link_count=0
class Parser(HTMLParser):
 def __init__(self,p):super().__init__();self.p=p;self.code=None;self.ids=set();self.lang=None
 def handle_starttag(self,tag,attrs):
  global link_count
  a=dict(attrs)
  if tag=='html':self.lang=a.get('lang')
  if 'id' in a:
   if a['id'] in self.ids:errors.append(f'{self.p.name}: duplicate ID {a["id"]}')
   self.ids.add(a['id'])
  if tag=='script' and 'src' not in a and a.get('type','') not in ['application/ld+json','application/json']:self.code=''
  for key in ['href','src']:
   raw=a.get(key,'');u=urlsplit(raw)
   if not raw or u.scheme or u.netloc or not u.path or '${' in raw:continue
   link_count+=1
   f=(R/unquote(u.path)) if not u.path.startswith('/') else None
   if f and not f.exists():errors.append(f'{self.p.name}: missing {raw}')
 def handle_data(self,data):
  if self.code is not None:self.code+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.code is not None:scripts.append([self.p.name,self.code]);self.code=None
pages=list(R.glob('*.html'))
for p in pages:
 parser=Parser(p);parser.feed(p.read_text())
 if not parser.lang:errors.append(f'{p.name}: missing language')
for p in (R/'assets').glob('*.js'):scripts.append([str(p.relative_to(R)),p.read_text()])
node="const fs=require('fs'),vm=require('vm');let errors=[];for(const [file,code] of JSON.parse(fs.readFileSync(0,'utf8'))){try{new vm.Script(code,{filename:file})}catch(e){errors.push(e.message+' in '+file)}}process.stdout.write(JSON.stringify(errors));"
r=subprocess.run(['node','-e',node],input=json.dumps(scripts),text=True,capture_output=True)
if r.returncode:errors.append(r.stderr)
else:errors+=json.loads(r.stdout)
print(json.dumps({'pages':len(pages),'local_links':link_count,'scripts':len(scripts),'errors':errors},ensure_ascii=False,indent=2))
sys.exit(bool(errors))
