import re, os, json
ROOT=os.path.expanduser('~/mnt/mskosman-com')
PDF={'2':'57032/638603660659670000','3':'57038/638603660712870000','4':'57034/638603660679970000','5':'57036/638603660696400000','6':'57040/638603660728830000','7':'57042/638603660749370000','8':'57044/638603660769070000'}
_S={}
def load(g):
    if g in _S: return _S[g]
    S={}; cur=None
    for l in open(ROOT+'/standards-source/computer-science-grade-%s-2024.md'%g,encoding='utf-8').read().split('\n'):
        m=re.match(r'^\*\*(\d\.[A-Z]+\.\d+)\*\* (.*)$',l)
        if m: cur=m.group(1); S[cur]=m.group(2); continue
        m=re.match(r'^- ([a-z])\. (.*)$',l)
        if m and cur: S[cur+m.group(1)]=m.group(2)
    _S[g]=S; return S
def q(s): return '"'+s.replace('"','\\"')+'"'
def bl(xs): return '\n'.join('- '+x for x in xs)
def L(g,n,slug,title,covers,obj,mats,tags,dev,prep,mins,warm,direct,guided,indep,look,sup,more,ext,notes,prereq=None):
    STD=load(g); codes=[]
    for c in covers:
        assert c in STD,(c)
        if c[:-1] not in codes: codes.append(c[:-1])
    assert len(mins)==4 and 15<=sum(mins)<=20,(slug,mins)
    assert dev in('unplugged','device','device-optional')
    fm=['---','title: '+q(title),'subject: "Computer Science"','grade: '+q(g),'durationMinutes: %d'%sum(mins),
        'solCodes: ['+', '.join(q(c) for c in codes)+']','objective: '+q(obj),'materials:']+['  - '+q(m) for m in mats]
    fm+=(['prerequisites:']+['  - '+q(p) for p in prereq]) if prereq else ['prerequisites: []']
    fm+=['standardsLinks:','  - label: '+q('2024 Computer Science SOL: Grade %s (PDF)'%g),'    url: '+q('https://www.doe.virginia.gov/home/showpublisheddocument/'+PDF[g]),
         '  - label: "VDOE Computer Science Standards of Learning"',
         '    url: "https://www.doe.virginia.gov/teaching-learning-assessment/k-12-standards-instruction/standards-of-learning"',
         'tags:']+['  - '+q(t) for t in tags+[dev]]+['updatedAt: 2026-11-13','---','']
    b=['**Standards covered (2024 Virginia Computer Science SOL)**','']
    for c0 in codes:
        b.append('- **'+c0+'** '+STD[c0])
        for c in covers:
            if c[:-1]==c0: b.append('  - '+c[-1]+'. '+STD[c])
    b.append('')
    if prep: b+=['## Prep','',bl(prep),'']
    b+=['## Warm-up (%d minutes)'%mins[0],'',warm.strip(),'',
        '## Direct Instruction (%d minutes)'%mins[1],'',bl(direct),'',
        '## Guided Practice (%d minutes)'%mins[2],'','\n'.join('%d. %s'%(i+1,x) for i,x in enumerate(guided)),'',
        '## Independent Practice / Quick Check (%d minutes)'%mins[3],'',indep.strip(),'','Look for:',bl(look),'',
        '## Differentiation','','**For students needing support**',bl(sup),'','**For students ready for more**',bl(more),'',
        '## Extensions','',bl(ext),'','## Notes for Parent/Instructor','',bl(notes),'']
    body='\n'.join(b)
    assert '—' not in body and '{' not in body and '<' not in body and '}' not in body,(slug)
    name='computer-science-%s-%02d-%s.mdx'%(g,n,slug)
    open(ROOT+'/src/content/lessons/'+name,'w',encoding='utf-8',newline='\n').write('\n'.join(fm)+body)
    print('%02d %d min %d words'%(n,sum(mins),len(body.split())))
