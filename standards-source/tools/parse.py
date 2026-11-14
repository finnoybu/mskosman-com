import re,hashlib,os,json
L=open('cs-layout.txt',encoding='utf-8').read().replace('\f','\n').split('\n')
G=[('2','Second'),('3','Third'),('4','Fourth'),('5','Fifth'),('6','Sixth'),('7','Seventh'),('8','Eighth')]
starts={}
for i,l in enumerate(L):
    m=re.match(r'^\s*(\w+) Grade: Computer Science\s*$',l)
    if m: starts[m.group(1)]=i
    if re.match(r'^\s*Middle School Elective: Computer Science\s*$',l): starts['END']=i
order=['Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth','END']
res={}
for g,name in G:
    seg=L[starts[name]:starts[order[order.index(name)+1]]]
    items=[]  # (kind,text)
    cur=None
    for l in seg:
        s=l.strip()
        if not s: 
            if cur and cur[0]=='intro': pass
            continue
        if s.startswith('Virginia Department of Education (VDOE)') or re.match(r'^Page \d+$',s): continue
        if re.match(r'^\w+ Grade: Computer Science$',s): cur=['head',s]; items.append(cur); cur=['intro','']; items.append(cur); continue
        m=re.match(r'^([A-Z][A-Za-z ]+ \([A-Z]+\))$',s)
        if m and not l.startswith('      '): cur=['strand',s]; items.append(cur); continue
        m=re.match(r'^(\d\.[A-Z]+\.\d+)\s+(.*)$',s)
        if m: cur=['std',m.group(1)+' '+m.group(2)]; items.append(cur); continue
        m=re.match(r'^([a-z])\.\s+(.*)$',s)
        if m: cur=['sub',m.group(1),m.group(2)]; items.append(cur); continue
        cur[-1]=(cur[-1]+s) if re.search(r'\w-$',cur[-1]) else (cur[-1]+' '+s).strip()
    res[g]=items
    flat=[re.sub(r'\s+',' ',it[-1]).strip() for it in items]
    s='\n'.join(flat)
    nstd=sum(1 for it in items if it[0]=='std'); nsub=sum(1 for it in items if it[0]=='sub'); nstr=sum(1 for it in items if it[0]=='strand')
    print(g,len(flat),'lines',nstr,'strands',nstd,'stds',nsub,'subs',hashlib.sha256(s.encode()).hexdigest()[:16])
json.dump(res,open('parsed.json','w'))

import hashlib
sig={g:[hashlib.sha1(re.sub(r'\s+',' ',it[-1]).strip().encode()).hexdigest()[:4] for it in items] for g,items in res.items()}
print(json.dumps(sig,separators=(',',':')))
