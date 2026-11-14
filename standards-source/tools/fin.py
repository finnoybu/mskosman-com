import glob,re,yaml,os,sys,subprocess
from collections import Counter
g=sys.argv[1]; os.chdir(os.path.expanduser('~/mnt/mskosman-com'))
src=open('standards-source/computer-science-grade-%s-2024.md'%g,encoding='utf-8').read()
allsub=[]; cur=None; nstd=0
for l in src.split('\n'):
    m=re.match(r'^\*\*(\d\.[A-Z]+\.\d+)\*\*',l)
    if m: cur=m.group(1); nstd+=1
    m=re.match(r'^- ([a-z])\. ',l)
    if m and cur: allsub.append(cur+m.group(1))
cov={}; rows=[]
for f in sorted(glob.glob('src/content/lessons/computer-science-%s-[0-9][0-9]-*.mdx'%g)):
    t=open(f,encoding='utf-8').read(); fm=yaml.safe_load(t.split('---')[1]); b=os.path.basename(f); n=int(b[19:21])
    cur=None; subs=[]
    for l in t.split('## ')[0].split('\n'):
        m=re.match(r'^- \*\*(\d\.[A-Z]+\.\d+)\*\*',l)
        if m: cur=m.group(1)
        m=re.match(r'^  - ([a-z])\. ',l)
        if m: subs.append(cur+m.group(1))
    for s in subs: cov.setdefault(s,[]).append(n)
    dev=[x for x in fm['tags'] if x in('unplugged','device','device-optional')][0]
    rows.append((n,b,fm['title'],fm['durationMinutes'],subs,dev))
miss=[s for s in allsub if s not in cov]; assert not miss,miss
assert [r[0] for r in rows]==list(range(1,len(rows)+1))
print('grade',g,len(rows),'lessons; subs',len(allsub),'covered; devices',dict(Counter(r[5] for r in rows)),'minutes',dict(sorted(Counter(r[3] for r in rows).items())))
L=['# Grade %s Computer Science lessons'%g,'',
'%d lessons covering all %d standards and all %d lettered sub-items of the 2024 Virginia Computer Science SOL for Grade %s.'%(len(rows),nstd,len(allsub),g),
'Standards text quoted in each lesson is pulled verbatim from `standards-source/computer-science-grade-%s-2024.md`.'%g,'',
'## Lessons','','| # | File | Title | Minutes | Devices | Standards covered |','|---|------|-------|---------|---------|-------------------|']
for n,f,t,d,s,dev in rows: L.append('| %d | `%s` | %s | %d | %s | %s |'%(n,f,t,d,dev,', '.join(s)))
L+=['','## Coverage by standard','','| Sub-item | Lesson(s) |','|----------|-----------|']
for s in allsub: L.append('| %s | %s |'%(s,', '.join(str(x) for x in cov[s])))
L+=['']
open('standards-source/computer-science-grade-%s-lessons.md'%g,'w',encoding='utf-8',newline='\n').write('\n'.join(L))
p='.astro/astro/content.d.ts'; t=open(p,encoding='utf-8').read()
old='''"computer-science-%s.mdx": {
	id: "computer-science-%s.mdx";
  slug: "computer-science-%s";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
'''%(g,g,g)
assert t.count(old)==1
new=''.join(old.replace('computer-science-%s.mdx'%g,r[1]).replace('"computer-science-%s"'%g,'"'+r[1][:-4]+'"') for r in rows)
open(p,'w',encoding='utf-8',newline='\n').write(t.replace(old,new))
open('_mdxcheck.mjs','w').write("""import {compile} from '@mdx-js/mdx'; import fs from 'node:fs';
let bad=0,n=0;
for (const f of fs.readdirSync('src/content/lessons').filter(f=>f.startsWith('computer-science-%s-'))) {
  const t=fs.readFileSync('src/content/lessons/'+f,'utf8'); const body=t.split('---').slice(2).join('---');
  try { await compile(body); n++; } catch(e) { bad++; console.log('FAIL',f,e.message); }
}
console.log('mdx compiled',n,'failed',bad); process.exit(bad?1:0);
"""%g)
r=subprocess.run(['node','_mdxcheck.mjs'],capture_output=True,text=True); os.remove('_mdxcheck.mjs'); print(r.stdout.strip()[-200:]); assert r.returncode==0
sh=lambda c: subprocess.run(c,shell=True,capture_output=True,text=True)
sh('git rm -q src/content/lessons/computer-science-%s.mdx'%g)
sh('git add src/content/lessons/computer-science-%s-*.mdx standards-source/computer-science-grade-%s-*.md; git add -u .astro/astro/content.d.ts'%(g,g))
r=sh('node scripts/check-lessons.js'); assert r.returncode==0; print([l for l in r.stdout.split('\n') if 'Total' in l][0])
an=sh("git log -1 --format='%an' origin/main").stdout.strip(); ae=sh("git log -1 --format='%ae' origin/main").stdout.strip()
msg="""content: real Grade %s Computer Science lessons (2024 SOL)

Replace the Grade %s Computer Science placeholder with %d lessons covering
all %d standards and %d lettered sub-items of the 2024 Virginia Computer
Science SOL. Standards text is quoted verbatim from VDOE.

Adds the verbatim Grade %s standards and the lesson coverage table to
standards-source/ and updates the generated Astro content types.

Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01RBBArbHhF7ACFbFu2TUwzs
"""%(g,g,len(rows),nstd,len(allsub),g)
open('/tmp/msg.txt','w').write(msg)
r=sh('git -c user.name="%s" -c user.email="%s" commit -q -F /tmp/msg.txt'%(an,ae)); assert r.returncode==0,r.stderr
print(sh('git log --oneline -1').stdout.strip(), '| status:', sh('git status --short').stdout.strip() or 'clean', '| locks:', sh('ls .git | grep -i lock').stdout.strip() or 'none')
