import json,re,os,sys
d=json.load(open('parsed.json'))
ROOT=os.path.expanduser('~/mnt/mskosman-com/standards-source/')
IDS={'2':('57002/638603595482300000','57032/638603660659670000','Second'),'3':('57004/638603595502530000','57038/638603660712870000','Third'),'4':('57006/638603595517830000','57034/638603660679970000','Fourth'),'5':('57008/638603595538000000','57036/638603660696400000','Fifth'),'6':('57010/638603595553400000','57040/638603660728830000','Sixth'),'7':('57014/638603595587970000','57042/638603660749370000','Seventh'),'8':('57012/638603595573270000','57044/638603660769070000','Eighth')}
DIFF={'2':'- 2.CSY.1d reads "binary code" in the current K-12 document and "binary" in the 2024 Grade 2 file.',
'4':'- 4.IC.3 has one sub-item (a) in the current K-12 document. The 2024 Grade 4 file also lists "Examine the impacts of diversity and inclusivity in computing technology fields." That sub-item is not in the current document and is not used here.',
'5':'- 5.IC.3 has two sub-items (a, b) in the current K-12 document. The 2024 Grade 5 file also lists "Examine the impacts of diversity and inclusivity in computing technology fields globally." That sub-item is not in the current document and is not used here.'}
B='https://www.doe.virginia.gov/home/showpublisheddocument/'
def mk(g):
    w,p,name=IDS[g]; items=d[g]
    nstd=sum(1 for it in items if it[0]=='std'); nsub=sum(1 for it in items if it[0]=='sub'); nstr=sum(1 for it in items if it[0]=='strand')
    L=['# Virginia Computer Science SOL (2024): Grade %s, verbatim'%g,'',
    'Captured 2026-11-13 from the Virginia Department of Education (VDOE).',
    'Standards text below is word for word from VDOE; nothing is paraphrased. Line breaks and spacing are normalized.','',
    '## Provenance','',
    '- Document: Computer Science Standards of Learning for Virginia Public Schools, June 2024',
    '- Adopted June 2024 by the Board of Education (approved June 21, 2024); must be fully implemented by the 2025-2026 school year.',
    '- Code format: `%s.AP.1` = grade . strand abbreviation . number. Sub-items are lettered `a.`, `b.`, `c.`'%g,
    '- Source of the text: the current All Computer Science K-12 PDF (file dated 2025-08-04), extracted by script:',
    '  '+B+'64370/638899211843770000',
    '- Compared line by line with the separate Grade %s Word file (dated 2024-09):'%g,
    '  '+B+w,
    '- Grade %s PDF (dated 2024-09): '%g+B+p,
    '- Computer Science SOL page: https://www.doe.virginia.gov/teaching-learning-assessment/k-12-standards-instruction/standards-of-learning','',
    '### Differences between the two VDOE files','',
    DIFF.get(g,'- None in wording. The two files match line for line.'),'']
    for it in items:
        k=it[0]; t=re.sub(r'\s+',' ',it[-1]).strip()
        if k=='head': L+=['## '+t,'']
        elif k=='intro': L+=[t,'']
        elif k=='strand': L+=['### '+t,'']
        elif k=='std':
            c,rest=t.split(' ',1); L+=['**%s** %s'%(c,rest),'']
        elif k=='sub':
            L+=['- %s. %s'%(it[1],t)]
    out=[]
    for i,l in enumerate(L):
        out.append(l)
        if l.startswith('- ') and re.match(r'^- [a-z]\. ',l) and (i+1==len(L) or not re.match(r'^- [a-z]\. ',L[i+1])): out.append('')
    out+=['## Count','','%d strands, %d standards, %d lettered sub-items.'%(nstr,nstd,nsub),'']
    open(ROOT+'computer-science-grade-%s-2024.md'%g,'w',encoding='utf-8',newline='\n').write('\n'.join(out))
for g in sys.argv[1:]: mk(g)
