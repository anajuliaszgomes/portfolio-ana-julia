// ── CONSTANTES ─────────────────────────────────────────────────────
const MESES=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const META_ACUM=[8,17,25,33,42,50,58,67,75,83,92,100];
const DOCS=['CADESP','ITR','CCIR','Arrendamento / Comodato / Parceria / Usufruto','Maquinários e Tanque','Certificado','Notas Fiscais'];
const SO=[
  {v:'arquivado',l:'Arquivado',c:'s0'},
  {v:'credenciamento',l:'Em Credenciamento',c:'s1'},
  {v:'ext_aberto',l:'Protocolo Ext. Aberto',c:'s2'},
  {v:'aguardando_doc',l:'Aguardando Documentos',c:'s3'},
  {v:'aguardando_notas',l:'Aguardando Notas',c:'s9'},
  {v:'saldo',l:'Saldo Disponível',c:'s4'},
  {v:'pendente_assinatura',l:'Pendente Assinatura',c:'s5'},
  {v:'enviado',l:'Contrato Enviado',c:'s6'},
  {v:'distrato',l:'Distrato',c:'s7'},
  {v:'buscar',l:'Buscar Original',c:'s8'},
];
const NAO_ARQ=new Set(['c124','c125','c126','c127','c128']);
const ORDEM_MESES=['Jan–Mai/25','Jun/25','Jul/25','Ago/25','Set/25','Out/25','Nov/25','Dez/25','Jan/26','Fev/26','Mar/26','Abr/26','Mai/26','Jun/26','Jul/26','Ago/26','Set/26','Out/26','Nov/26','Dez/26'];

const CI=[
  {id:'c1',mes:'Jan–Mai/25',nome:'Ricardo de Oliveira Furlan',status:'arquivado',obs:''},
  {id:'c2',mes:'Jan–Mai/25',nome:'Adinei Aparecido Veiga',status:'arquivado',obs:'Aguardando notas, deferido'},
  {id:'c3',mes:'Jan–Mai/25',nome:'Carlos Alberto Febole',status:'arquivado',obs:'Poucas notas - já gastou na capal'},
  {id:'c4',mes:'Jan–Mai/25',nome:'Cesar Luchetti',status:'arquivado',obs:'Ajustando doc.'},
  {id:'c5',mes:'Jan–Mai/25',nome:'Bento Luchetti',status:'arquivado',obs:'Ajustando doc.'},
  {id:'c6',mes:'Jan–Mai/25',nome:'Jefferson Rossetto',status:'credenciamento',obs:'Credenciado - 1 nota (gado)'},
  {id:'c7',mes:'Jan–Mai/25',nome:'Edson Parussulo',status:'credenciamento',obs:'Em credenciamento'},
  {id:'c8',mes:'Jan–Mai/25',nome:'Fernando Romano Oliveira',status:'arquivado',obs:'Optou por não fazer'},
  {id:'c9',mes:'Jan–Mai/25',nome:'Gilberto Luiz Lopes Junior',status:'arquivado',obs:'Parceiro'},
  {id:'c10',mes:'Jan–Mai/25',nome:'Eder Clai Ghuizzi',status:'saldo',obs:'Tem saldo'},
  {id:'c11',mes:'Jan–Mai/25',nome:'Decio Feltrin',status:'saldo',obs:'Tem saldo 09/25'},
  {id:'c12',mes:'Jan–Mai/25',nome:'José Morelli',status:'saldo',obs:'Tem saldo, pendente a liberar 2023 p frente'},
  {id:'c13',mes:'Jan–Mai/25',nome:'João Bosco Dal Col',status:'saldo',obs:'Pedindo crédito'},
  {id:'c14',mes:'Jan–Mai/25',nome:'Junior Chiquinelli',status:'saldo',obs:'Tem saldo'},
  {id:'c15',mes:'Jan–Mai/25',nome:'Linconl Jhonson',status:'saldo',obs:'Tem saldo'},
  {id:'c16',mes:'Jan–Mai/25',nome:'Marcio Bertanha',status:'saldo',obs:'Tem saldo'},
  {id:'c17',mes:'Jan–Mai/25',nome:'Marcio Pereira Lima',status:'aguardando_doc',obs:'Pendente documentos'},
  {id:'c18',mes:'Jan–Mai/25',nome:'Mario Cesar Lorencetto',status:'saldo',obs:'Tem saldo'},
  {id:'c19',mes:'Jan–Mai/25',nome:'Valdir Parassulo',status:'saldo',obs:'Tem saldo'},
  {id:'c20',mes:'Jan–Mai/25',nome:'Caio Augusto Ferreira',status:'buscar',obs:'Buscar notas'},
  {id:'c21',mes:'Jan–Mai/25',nome:'Rodrigo de Oliveira Cevallos',status:'arquivado',obs:'Ajustar documentos - contador enrolado'},
  {id:'c22',mes:'Jan–Mai/25',nome:'João Favaro',status:'saldo',obs:'Tem saldo'},
  {id:'c23',mes:'Jan–Mai/25',nome:'Douglas Ferrarezi',status:'arquivado',obs:'Silvio - acompanhar'},
  {id:'c24',mes:'Jan–Mai/25',nome:'Juversi Ferrarezi',status:'arquivado',obs:'Silvio - acompanhar'},
  {id:'c25',mes:'Jan–Mai/25',nome:'José Clóvis Miranda',status:'saldo',obs:'Tem saldo'},
  {id:'c26',mes:'Jun/25',nome:'Leandro Cristian dos Santos',status:'ext_aberto',obs:'Extemporâneo aberto'},
  {id:'c27',mes:'Jun/25',nome:'Luiz Gobbo',status:'saldo',obs:'Tem saldo'},
  {id:'c28',mes:'Jun/25',nome:'Eliete Groenwold',status:'arquivado',obs:'Inscrição baixada'},
  {id:'c29',mes:'Jun/25',nome:'José Bagdal',status:'credenciamento',obs:'Credenciado 2, pedir crédito'},
  {id:'c30',mes:'Jun/25',nome:'Sonia Gonçalves',status:'credenciamento',obs:'Credenciamento ok, solicitei notas'},
  {id:'c31',mes:'Jun/25',nome:'Helio Domingues',status:'credenciamento',obs:'Credenciado, PENDENTE CNAE'},
  {id:'c32',mes:'Jun/25',nome:'Wellington Antunes Toledo',status:'saldo',obs:'Tem saldo'},
  {id:'c33',mes:'Jun/25',nome:'João Valentim Calarga',status:'credenciamento',obs:'Em cmto. PF Prudente. ACOMPANHAR'},
  {id:'c34',mes:'Jul/25',nome:'Janaine Benedetti Moreira',status:'saldo',obs:'Tem saldo'},
  {id:'c35',mes:'Jul/25',nome:'Eli Pontes',status:'credenciamento',obs:'2 Credenciadas; 1 AJUSTANDO DOC'},
  {id:'c36',mes:'Jul/25',nome:'Diovane Bonotto',status:'credenciamento',obs:'Crédito pedido - acompanhar'},
  {id:'c37',mes:'Jul/25',nome:'Maria dos Santos Ferreira',status:'saldo',obs:'Pouco crédito'},
  {id:'c38',mes:'Jul/25',nome:'José Benedito Santos de Campos',status:'aguardando_doc',obs:'Ajustando doc.'},
  {id:'c39',mes:'Jul/25',nome:'Roberta Bertin',status:'saldo',obs:'Tem saldo'},
  {id:'c40',mes:'Jul/25',nome:'José Pascoal Bortotti',status:'distrato',obs:'DISTRATO'},
  {id:'c41',mes:'Jul/25',nome:'Joice de Camargo',status:'arquivado',obs:'Recuperação dos créditos de 2026 p/ novo CNPJ'},
  {id:'c42',mes:'Jul/25',nome:'Nilton Antunes Toledo',status:'ext_aberto',obs:'Extemporâneo aberto'},
  {id:'c43',mes:'Jul/25',nome:'Danilo Alves Ferreira',status:'aguardando_doc',obs:'Ajustando doc.'},
  {id:'c44',mes:'Ago/25',nome:'Anderson Garbin',status:'arquivado',obs:'Deferido, pegar notas'},
  {id:'c45',mes:'Ago/25',nome:'Reginaldo Mantovano',status:'aguardando_doc',obs:'Ajustando doc.'},
  {id:'c46',mes:'Ago/25',nome:'Irineu Mantovano',status:'aguardando_doc',obs:'Ajustando doc.'},
  {id:'c47',mes:'Ago/25',nome:'Tiago Azenha',status:'credenciamento',obs:'Pedir crédito, pendente situação do diesel'},
  {id:'c48',mes:'Ago/25',nome:'Adauto Gavioli',status:'saldo',obs:'Tem saldo'},
  {id:'c49',mes:'Ago/25',nome:'Marcia Moraes Leme (Tadeu)',status:'credenciamento',obs:'Crédito pedido'},
  {id:'c50',mes:'Ago/25',nome:'Osmar Luiz Bandoni Junior',status:'saldo',obs:'Tem saldo'},
  {id:'c51',mes:'Set/25',nome:'Cristiani Mariani',status:'ext_aberto',obs:'Extemporâneo aberto'},
  {id:'c52',mes:'Set/25',nome:'Paulo Cezar Lopes',status:'saldo',obs:'Tem saldo'},
  {id:'c53',mes:'Set/25',nome:'Paula Fucks',status:'saldo',obs:'Tem saldo'},
  {id:'c54',mes:'Set/25',nome:'Ricardo Foltran - Eleopercio',status:'distrato',obs:'DISTRATO'},
  {id:'c55',mes:'Set/25',nome:'Augusto Marmo',status:'saldo',obs:'Tem saldo, acompanhar'},
  {id:'c56',mes:'Set/25',nome:'Nelson Mariani',status:'ext_aberto',obs:'Extemporâneo aberto'},
  {id:'c57',mes:'Set/25',nome:'Dagoberto Souza Gomes',status:'saldo',obs:'Tem saldo, acompanhar 03/02'},
  {id:'c58',mes:'Set/25',nome:'João Carlos Fucks',status:'saldo',obs:'Pouco saldo liberado'},
  {id:'c59',mes:'Out/25',nome:'Marino José Queiroz',status:'aguardando_doc',obs:'Pendente contrato arrendamento'},
  {id:'c60',mes:'Out/25',nome:'Juliano Caires',status:'arquivado',obs:'Deferido, pegar notas'},
  {id:'c61',mes:'Out/25',nome:'Quirino Caires',status:'arquivado',obs:'Pré-análise - georreferenciamento'},
  {id:'c62',mes:'Out/25',nome:'Mauro Donizete Mazeti',status:'aguardando_doc',obs:'Pendente maq e certificado, retornar 18/02'},
  {id:'c63',mes:'Out/25',nome:'Luiz Augusto Favero',status:'credenciamento',obs:'Quer aguardar para cmdto'},
  {id:'c64',mes:'Out/25',nome:'Gabriel Almeida Nicoletti',status:'aguardando_doc',obs:'Pendente certificado digital e ajuste ITR'},
  {id:'c65',mes:'Out/25',nome:'Alessandro Ferreira',status:'aguardando_doc',obs:'Pendente CCIR recente'},
  {id:'c66',mes:'Out/25',nome:'Ronaldo Soares',status:'arquivado',obs:'Bertoni pediu notas 23/01'},
  {id:'c67',mes:'Nov/25',nome:'Jose Luiz da Silveira (Gisele, Wallison)',status:'aguardando_doc',obs:'Pendente certificado digital'},
  {id:'c68',mes:'Nov/25',nome:'Marcelo Beloti Favaro',status:'saldo',obs:'Tem saldo'},
  {id:'c69',mes:'Nov/25',nome:'Djalma Neves Pontes',status:'aguardando_doc',obs:'Pendente procuração'},
  {id:'c70',mes:'Nov/25',nome:'Jose Ruiz Sansao (Fabiano Agromax)',status:'credenciamento',obs:'Vai aguardar, pendente docs cmdto'},
  {id:'c71',mes:'Nov/25',nome:'Bruno Sargi',status:'credenciamento',obs:'Credenciamento aberto'},
  {id:'c72',mes:'Nov/25',nome:'Andre Villela Rosa',status:'ext_aberto',obs:'Extemporâneo aberto'},
  {id:'c73',mes:'Nov/25',nome:'Marlei Neves Pontes',status:'credenciamento',obs:'Credenciamento pedido 15/12'},
  {id:'c74',mes:'Dez/25',nome:'Sergio Aparecido Roque',status:'credenciamento',obs:'Em credenciamento'},
  {id:'c75',mes:'Jan/26',nome:'Sebastião Aparecido',status:'ext_aberto',obs:'Extemporâneo aberto'},
  {id:'c76',mes:'Jan/26',nome:'Luiz Osvaldo Del Grossi',status:'arquivado',obs:'Vai vender prop menor e ficar com a maior'},
  {id:'c77',mes:'Jan/26',nome:'Douglas Aparecido Magalhaes',status:'ext_aberto',obs:'Extemporâneo aberto'},
  {id:'c78',mes:'Jan/26',nome:'Bruno Luiz Marques',status:'credenciamento',obs:'Doc cred pendentes, solicitei 15/01'},
  {id:'c79',mes:'Jan/26',nome:'Luiz Carlos Marques',status:'credenciamento',obs:'Doc cred pendentes, solicitei 15/01'},
  {id:'c80',mes:'Jan/26',nome:'Aparecida Moretti Marques',status:'credenciamento',obs:'Doc cred pendentes, solicitei 15/01'},
  {id:'c81',mes:'Jan/26',nome:'Diego Germano de Oliveira',status:'aguardando_doc',obs:'Contador vai ajustar - lembrar regularmente'},
  {id:'c82',mes:'Jan/26',nome:'Sidney Antonio Roseiro Goulart',status:'aguardando_doc',obs:'Contador ajustando docs 03/02'},
  {id:'c83',mes:'Jan/26',nome:'Debora Rodrigues da Silva',status:'ext_aberto',obs:'Extemporâneo aberto'},
  {id:'c84',mes:'Jan/26',nome:'Carlos Rogerio Marques',status:'credenciamento',obs:'Doc cred pendentes, solicitei 15/01'},
  {id:'c85',mes:'Jan/26',nome:'Valdir de Souza Rodrigues',status:'arquivado',obs:'Aguardando notas'},
  {id:'c86',mes:'Jan/26',nome:'Wanderlei Marson',status:'ext_aberto',obs:'Extemporâneo aberto'},
  {id:'c87',mes:'Fev/26',nome:'Maurino Masteline',status:'aguardando_doc',obs:'Pendentes documentos, cobrei'},
  {id:'c88',mes:'Fev/26',nome:'Maurino Masteline Junior',status:'ext_aberto',obs:'Extemporâneo aberto'},
  {id:'c89',mes:'Fev/26',nome:'Silvio José Masteline',status:'aguardando_doc',obs:'Pendentes documentos, cobrei'},
  {id:'c90',mes:'Fev/26',nome:'Elvem Andrade',status:'arquivado',obs:'Cobrei ajustes 10/04'},
  {id:'c91',mes:'Fev/26',nome:'Benedito Rodrigues de Oliveira - Roque',status:'arquivado',obs:''},
  {id:'c92',mes:'Fev/26',nome:'José Aldo dos Santos Filho e Outro',status:'arquivado',obs:''},
  {id:'c93',mes:'Fev/26',nome:'Dauer Sikora',status:'aguardando_doc',obs:'Verificar documentos enviados via e-mail'},
  {id:'c94',mes:'Mar/26',nome:'Sebastião Macedo',status:'aguardando_doc',obs:'Rosicleia providenciando docs'},
  {id:'c95',mes:'Mar/26',nome:'Lília Almeida',status:'arquivado',obs:'Pedi notas'},
  {id:'c96',mes:'Mar/26',nome:'Jonas Ortolano',status:'aguardando_doc',obs:'Pendente ajuste'},
  {id:'c97',mes:'Mar/26',nome:'Juliana Seixas Gazzetta',status:'credenciamento',obs:'Em credenciamento'},
  {id:'c98',mes:'Mar/26',nome:'Marcio Pinto de Oliveira',status:'credenciamento',obs:'Em credenciamento'},
  {id:'c99',mes:'Mar/26',nome:'Rogerio Pereira dos Santos',status:'arquivado',obs:'Conversei sobre os ajustes dia 08/04'},
  {id:'c100',mes:'Mar/26',nome:'Ronaldo Pereira dos Santos',status:'aguardando_doc',obs:'Pendente contrato comodato, pedi 08/04'},
  {id:'c101',mes:'Mar/26',nome:'Rafael Fogaça dos Santos',status:'aguardando_doc',obs:'Informei 16/04 - pendente ajustes - aguardar 30/04'},
  {id:'c102',mes:'Mar/26',nome:'José Roberto dos Santos',status:'aguardando_doc',obs:'Informei 16/04 - pendente ajustes - aguardar 30/04'},
  {id:'c103',mes:'Mar/26',nome:'Edgard Karnick Nahas',status:'ext_aberto',obs:'Extemporâneo aberto'},
  {id:'c104',mes:'Abr/26',nome:'Jose Atemio',status:'arquivado',obs:''},
  {id:'c105',mes:'Abr/26',nome:'Wilson Andre Carminatti',status:'arquivado',obs:'OK'},
  {id:'c106',mes:'Abr/26',nome:'Fabio Stabile',status:'credenciamento',obs:'Em credenciamento, ir atualizando Thaiara'},
  {id:'c107',mes:'Abr/26',nome:'Rodrigo Vidotti Machado',status:'arquivado',obs:'OK'},
  {id:'c108',mes:'Abr/26',nome:'Alexandre Vidotti Machado',status:'arquivado',obs:'OK'},
  {id:'c109',mes:'Abr/26',nome:'Maria Iva de Camargo Casadei',status:'arquivado',obs:''},
  {id:'c110',mes:'Abr/26',nome:'Fioravante Rossetti Filho',status:'arquivado',obs:''},
  {id:'c111',mes:'Abr/26',nome:'Eduardo Cogo Abib',status:'aguardando_doc',obs:'Pendente certificado - sem tanque'},
  {id:'c112',mes:'Mai/26',nome:'Leandro Abib',status:'arquivado',obs:''},
  {id:'c113',mes:'Mai/26',nome:'Celso Lourenço Lopes (Roduardo)',status:'arquivado',obs:''},
  {id:'c114',mes:'Mai/26',nome:'Pedro Grotto Barrera',status:'arquivado',obs:''},
  {id:'c115',mes:'Mai/26',nome:'Rafael Cassio Freitas - EDDI',status:'arquivado',obs:''},
  {id:'c116',mes:'Mai/26',nome:'Rafael Cassio Freitas dos Santos',status:'arquivado',obs:''},
  {id:'c117',mes:'Mai/26',nome:'Jose Ronaldo Lopes - EDDI',status:'arquivado',obs:''},
  {id:'c118',mes:'Jun/26',nome:'Jose Carlos Casadei',status:'arquivado',obs:''},
  {id:'c119',mes:'Jun/26',nome:'Rafael Dib',status:'arquivado',obs:''},
  {id:'c120',mes:'Jun/26',nome:'Kengi',status:'arquivado',obs:''},
  {id:'c121',mes:'Jun/26',nome:'Fernanda',status:'arquivado',obs:''},
  {id:'c122',mes:'Jun/26',nome:'Tiago Minoru',status:'aguardando_doc',obs:'PENDENTE DOCUMENTOS'},
  {id:'c123',mes:'Jun/26',nome:'Paulo Pizzi',status:'enviado',obs:''},
  {id:'c124',mes:'Jun/26',nome:'Rodrigo Pimentel',status:'enviado',obs:'Pendente documentos'},
  {id:'c125',mes:'Jun/26',nome:'Eder Luis Maccari',status:'enviado',obs:''},
  {id:'c126',mes:'Jun/26',nome:'Paulo Bortolan',status:'enviado',obs:'Vai aguardar'},
  {id:'c127',mes:'Jun/26',nome:'Ronaldo Poit',status:'enviado',obs:''},
  {id:'c128',mes:'Jun/26',nome:'Alisson Fernandopolis',status:'aguardando_doc',obs:''},
];
const PI=[
  {id:'p1',nome:'Neusa',status:'Acompanhar',obs:''},
  {id:'p2',nome:'Alice Scarin',status:'Enviado',obs:''},
  {id:'p3',nome:'Alexandre Gualdani - Marcela',status:'',obs:''},
  {id:'p4',nome:'Cesar Ravanhani',status:'Cerca Viva',obs:''},
  {id:'p5',nome:'Fernando Henrique Ribeiro',status:'Enviado',obs:'VERIFICAR SEGUNDA'},
  {id:'p6',nome:'Junior Canonico',status:'Enviado',obs:'SÓCIO EM CONTATO COM GILSON'},
  {id:'p7',nome:'Tiago Camargo',status:'Aguardando',obs:''},
  {id:'p8',nome:'Peter Elshof',status:'Enviado',obs:''},
  {id:'p9',nome:'Adilson Joao Bota',status:'Aguardando',obs:''},
  {id:'p10',nome:'Rodrigo Klocker',status:'Aguardando',obs:''},
  {id:'p11',nome:'Giovani Donizeti',status:'Em andamento',obs:''},
  {id:'p12',nome:'Samuel Umbelino',status:'Enviado',obs:''},
  {id:'p13',nome:'Roseli Itapeva',status:'Agendar visita',obs:'CONTATO SEGUNDA 03/11'},
  {id:'p14',nome:'Marcos Horicuhi',status:'Aguardando',obs:''},
  {id:'p15',nome:'Ademar Belotto',status:'Enviado',obs:''},
  {id:'p16',nome:'Roque Brunetti',status:'Lead futuro',obs:''},
  {id:'p17',nome:'Carlos Hargreaves',status:'Enviado',obs:''},
  {id:'p18',nome:'Dimas Zambianco',status:'Enviado',obs:''},
  {id:'p19',nome:'Elenita Bocalon Pires',status:'',obs:''},
  {id:'p20',nome:'Dr Plinio',status:'Verificar c/ dr Eduardo',obs:''},
  {id:'p21',nome:'Giovani Augusto (Fernandopolis)',status:'',obs:''},
  {id:'p22',nome:'Jean Carlo Reynaldo Silva',status:'',obs:''},
  {id:'p23',nome:'Thomas Lelis',status:'',obs:''},
  {id:'p24',nome:'Orlando de Freitas Mendes',status:'Pré-análise',obs:'Pendente dados para fazer o contrato'},
  {id:'p25',nome:'Edson da Silva Tanaka',status:'Pré-análise',obs:'Pendente ajustes, verificar e-mail'},
  {id:'p26',nome:'Luiz Carlos de Freitas',status:'',obs:'Pendente ITR 2025'},
  {id:'p27',nome:'Ricardo Dal Col',status:'Pré-análise',obs:''},
  {id:'p28',nome:'Admur da Costa',status:'Pré-análise',obs:''},
  {id:'p29',nome:'Francisco',status:'',obs:'Tel: 16 99328-1383'},
  {id:'p30',nome:'Izidorio',status:'Aguardando assinatura',obs:'Bertoni entrou em contato 09/01 - sem assinatura'},
  {id:'p31',nome:'Nerlei Sargi',status:'Quer aguardar',obs:''},
  {id:'p32',nome:'Alexandre Fernandes Gualdani',status:'',obs:''},
  {id:'p33',nome:'Dani Pulcini',status:'',obs:''},
];
const DC={novos:[12,7,10,6,6,0,0,0,0,0,0,0],enviados:[0,0,0,0,6,0,0,0,0,0,0,0],qualifMes:[26,22,20,20,11,0,0,0,0,0,0,0],convertidos:[10,5,5,4,4,0,0,0,0,0,0,0],renov:[0,0,0,0,2,0,0,0,0,0,0,0],renovObs:['','','','','','','','','','','','']};
const WSD=[
  {nome:'Matão',i:62,p:15,q:8,a:2,ag:2},{nome:'Fernandópolis',i:71,p:30,q:9,a:5,ag:1},
  {nome:'S.J.Rio Preto',i:33,p:5,q:0,a:0,ag:0},{nome:'Jales (Senar/Agro)',i:84,p:0,q:0,a:1,ag:1},
  {nome:'Monte Azul Paulista',i:66,p:26,q:0,a:0,ag:0},{nome:'Votuporanga',i:57,p:13,q:0,a:2,ag:0},
  {nome:'Coroados',i:70,p:14,q:5,a:1,ag:0},{nome:'Franca',i:55,p:5,q:1,a:0,ag:0},{nome:'Jales II',i:52,p:20,q:0,a:0,ag:0},
];

// LGPD — só sobrenomes, metade visível
const ART=new Set(['de','da','do','das','dos','e','di']);
function mask(nome){
  const partes=nome.split(' ');
  let sobrenomeCount=0;
  return partes.map((p,i)=>{
    if(i===0) return p;
    if(ART.has(p.toLowerCase())||p.length<=2) return p;
    sobrenomeCount++;
    if(sobrenomeCount===1) return p.slice(0,2)+'**';
    return null; // remove demais sobrenomes
  }).filter(p=>p!==null).join(' ');
}

function stCls(v){return (SO.find(s=>s.v===v)||{c:'s0'}).c;}
function stLbl(v){return (SO.find(s=>s.v===v)||{l:v}).l;}

// ── STORAGE (Supabase — salva na nuvem, sincroniza em qualquer dispositivo) ──
const SUPABASE_URL = 'https://thjozgotdkewspcwjexy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_teiEvPafv1jsVbCJSsQRxA_iHidvvQs';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const ROW_ID = 'rural';
let state;
function getDefaults(){
  return {
    com:{...DC,novos:[...DC.novos],enviados:[...DC.enviados],qualifMes:[...DC.qualifMes],convertidos:[...DC.convertidos],renov:[...DC.renov],renovObs:[...DC.renovObs]},
    clientes:CI.map(c=>({...c,arquivado:!NAO_ARQ.has(c.id),docs:{}})),
    pipeline:PI.map(p=>({...p})),
    workshops:WSD.map((w,i)=>({...w,id:'w'+i,participantes:[]})),
    maquinarios:[],
    mesesExtras:[],
  };
}
async function loadState(){
  try{
    const {data:row,error}=await sb.from('crm_state').select('data').eq('id',ROW_ID).single();
    if(error||!row||!row.data||!Object.keys(row.data).length) return getDefaults();
    const s=row.data;
    const savedIds=new Set((s.clientes||[]).map(c=>c.id));
    const merged=[...(s.clientes||[])];
    CI.forEach(c=>{if(!savedIds.has(c.id)) merged.push({...c,arquivado:!NAO_ARQ.has(c.id),docs:{}}); });
    const savedPids=new Set((s.pipeline||[]).map(p=>p.id));
    const mergedP=[...(s.pipeline||[])];
    PI.forEach(p=>{if(!savedPids.has(p.id)) mergedP.push({...p});});
    const workshops=(s.workshops&&s.workshops.length)?s.workshops:WSD.map((w,i)=>({...w,id:'w'+i,participantes:[]}));
    return {com:s.com||{...DC},clientes:merged,pipeline:mergedP,workshops,maquinarios:s.maquinarios||[],mesesExtras:s.mesesExtras||[]};
  }catch(e){return getDefaults();}
}
// Lista de meses ativos = meses padrão + meses adicionados manualmente
function mesesAtivos(){
  const extras=(state.mesesExtras||[]).filter(m=>!ORDEM_MESES.includes(m));
  return [...ORDEM_MESES,...extras];
}
function addMes(){
  const nome=prompt('Nome do novo mês (ex: Jan/27):');
  if(!nome||!nome.trim()) return;
  const n=nome.trim();
  if(mesesAtivos().includes(n)){ toast('Este mês já existe.'); return; }
  if(!state.mesesExtras) state.mesesExtras=[];
  state.mesesExtras.push(n);
  openPanels.add('mes-'+n);
  save();renderClientes();
  toast('Mês "'+n+'" adicionado.');
}
let svT=null;
function save(){
  clearTimeout(svT);
  svT=setTimeout(async()=>{
    try{
      state._t=new Date().toISOString();
      await sb.from('crm_state').upsert({id:ROW_ID,data:state,updated_at:new Date().toISOString()});
      updLbl();
    }catch(e){console.error('Erro ao salvar no banco:',e);}
  },400);
}
function updLbl(){}

// ── TABS ───────────────────────────────────────────────────────────
function showTab(id){
  document.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',['comercial','clientes','pipeline','workshops','renovacoes'][i]===id));
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
}

const sum=a=>a.reduce((x,y)=>x+y,0);
const pct=(a,b)=>b>0?Math.round(a/b*100):0;
function acum(a){let s=0;return a.map(v=>{s+=v;return s;});}
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);}

// ── COMERCIAL ──────────────────────────────────────────────────────
let ch=null;
function renderCom(){
  const c=state.com,ac=acum(c.novos);
  const mesesAtivos=c.novos.map((v,i)=>({v,i})).filter(x=>x.v>0);
  const pre=mesesAtivos.length||1;
  const tot=sum(c.novos),totQ=sum(c.qualifMes),totC=sum(c.convertidos),totE=sum(c.enviados);
  const p=Math.round(tot/100*100),pr=Math.round(tot/pre*12);
  // conversão considerando TODOS os meses, sem excluir nenhum
  const cv=pct(totC,totQ);
  const cvRef=cv;
  document.getElementById('kpis').innerHTML=`
    <div class="kpi"><div class="kl">Contratos novos</div><div class="kv">${tot}</div><div class="ks">acumulado 2026</div><div class="pb"><div class="pf" style="width:${Math.min(p,100)}%"></div></div></div>
    <div class="kpi"><div class="kl">Atingimento</div><div class="kv ${p>=42?'ok':p>=30?'warn':'bad'}">${p}%</div><div class="ks">da meta anual</div><div class="pb"><div class="pf" style="width:${Math.min(p,100)}%;background:${p>=42?'var(--g3)':'#b45309'}"></div></div></div>
    <div class="kpi"><div class="kl">Projeção anual</div><div class="kv ${pr>=100?'ok':pr>=90?'warn':'bad'}">${pr}</div><div class="ks">contratos projetados</div><div class="pb"><div class="pf" style="width:${Math.min(pr,100)}%;background:${pr>=100?'var(--g3)':'var(--go)'}"></div></div></div>
    <div class="kpi"><div class="kl">Conversão funil</div><div class="kv ${cvRef>=30?'ok':'warn'}">${cvRef}%</div><div class="ks">todos os meses</div><div class="pb"><div class="pf" style="width:${Math.min(cvRef,100)}%;background:var(--go)"></div></div></div>`;
  const tb=document.getElementById('tBody');tb.innerHTML='';
  MESES.forEach((m,i)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${m.slice(0,3)}</td>
      <td><input type="number" min="0" max="99" value="${c.novos[i]}" data-i="${i}" data-t="novos"></td>
      <td><input type="number" min="0" max="99" value="${c.enviados[i]}" data-i="${i}" data-t="enviados" style="background:#eff6ff"></td>
      <td><input type="number" min="0" max="999" value="${c.qualifMes[i]}" data-i="${i}" data-t="qualifMes" style="background:#f0fdf4;width:54px"></td>
      <td><input type="number" min="0" max="99" value="${c.convertidos[i]}" data-i="${i}" data-t="convertidos" style="background:#dbeafe"></td>
      <td style="text-align:center;font-size:12px;font-weight:600;color:${c.qualifMes[i]>0?(pct(c.convertidos[i],c.qualifMes[i])>=40?'#166534':'#92400e'):'#9ca3af'}">${c.qualifMes[i]>0?pct(c.convertidos[i],c.qualifMes[i])+'%':'—'}</td>
      <td style="font-weight:500">${ac[i]}</td>
      <td>${c.novos[i]===0&&i>=5?'<span class="bdg bnd">—</span>':ac[i]>=META_ACUM[i]?'<span class="bdg bok">No ritmo</span>':ac[i]>=META_ACUM[i]*.9?'<span class="bdg bwarn">Atenção</span>':'<span class="bdg bbad">Abaixo</span>'}</td>`;
    tb.appendChild(tr);
  });
  tb.querySelectorAll('input').forEach(el=>el.addEventListener('change',e=>{
    state.com[e.target.dataset.t][+e.target.dataset.i]=Math.max(0,+e.target.value||0);save();renderCom();
  }));
  document.getElementById('funil').innerHTML=[
    ['Qualificados',totQ,100,'var(--g1)'],['Enviados',totE,pct(totE,totQ),'var(--g2)'],['Fechados',tot,pct(tot,totQ),'var(--g3)'],
  ].map(([l,v,p2,cl])=>`<div class="fr"><div class="ft"><span>${l}</span><span>${v}</span></div><div class="fb"><div class="ff" style="width:${Math.min(p2,100)}%;background:${cl}"></div></div></div>`).join('');
  const falta=Math.max(0,100-tot),mr=12-pre;
  document.getElementById('insights').innerHTML=`
    <div class="ins ${pr>=100?'iok':'iw'}">${pr>=100?'✓':'!'} Projeção de ${pr} contratos — ${pr>=100?'dentro da meta':'faltam '+falta+' em '+mr+' meses'}.</div>
    <div class="ins ${cvRef>=30?'iok':'iw'}">${cvRef>=30?'✓':'!'} Conversão: ${cvRef}% (todos os meses). Meta recomendada: 30%+.</div>
    <div class="ins ii">i ${state.clientes.length} clientes · ${state.pipeline.length} leads no pipeline.</div>`;
  if(ch){
    ch.data.datasets[0].data=[...ac];
    ch.data.datasets[1].data=[...META_ACUM];
    ch.update();
  } else ch=new Chart(document.getElementById('chart'),{
    type:'bar',
    data:{
      labels:MESES.map(m=>m.slice(0,3)),
      datasets:[
        {
          label:'Contratos acumulados',
          data:[...ac],
          backgroundColor:'#2d6a47',
          hoverBackgroundColor:'#1a4a2e',
          borderRadius:6,
          barPercentage:.6,
          categoryPercentage:.7,
          order:2
        },
        {
          label:'Meta acumulada',
          data:[...META_ACUM],
          type:'line',
          borderColor:'#c9a84c',
          backgroundColor:'rgba(201,168,76,.08)',
          pointBackgroundColor:'#c9a84c',
          pointBorderColor:'#fff',
          pointBorderWidth:1.5,
          pointRadius:3.5,
          pointHoverRadius:5,
          borderWidth:2.5,
          borderDash:[6,4],
          tension:.35,
          fill:false,
          order:1
        }
      ]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{
          display:true,
          position:'top',
          align:'end',
          labels:{usePointStyle:true,pointStyle:'rectRounded',boxWidth:8,boxHeight:8,font:{size:11,family:'Inter'},color:'#4b5563',padding:14}
        },
        tooltip:{
          backgroundColor:'#1a4a2e',
          titleFont:{size:12,weight:'600'},
          bodyFont:{size:12},
          padding:10,
          cornerRadius:8,
          boxPadding:4
        }
      },
      scales:{
        x:{grid:{display:false},ticks:{font:{size:11},color:'#9ca3af'},border:{display:false}},
        y:{
          grid:{color:'rgba(0,0,0,.05)'},
          ticks:{font:{size:11},color:'#9ca3af',stepSize:20},
          border:{display:false},
          min:0,max:110
        }
      }
    }
  });
}

// ── CLIENTES ───────────────────────────────────────────────────────
let filtroNome='',filtroStatus='';
let openPanels=new Set();
let viewMode='mes';

function setViewMode(m){
  viewMode=m;
  document.getElementById('vb-mes').classList.toggle('active',m==='mes');
  document.getElementById('vb-mes').style.background=m==='mes'?'var(--g1)':'#f3f4f6';
  document.getElementById('vb-mes').style.color=m==='mes'?'#fff':'var(--t2)';
  document.getElementById('vb-status').classList.toggle('active',m==='status');
  document.getElementById('vb-status').style.background=m==='status'?'var(--g1)':'#f3f4f6';
  document.getElementById('vb-status').style.color=m==='status'?'#fff':'var(--t2)';
  const fsel=document.getElementById('fselStatus');
  if(fsel) fsel.style.display=m==='status'?'none':'';
  const btnAdd=document.getElementById('btnAddMes');
  if(btnAdd) btnAdd.style.display=m==='status'?'none':'';
  renderClientes();
}

function renderClientes(){
  if(viewMode==='status') return renderClientesPorStatus();
  return renderClientesPorMes();
}

function renderClientesPorStatus(){
  const cont=document.getElementById('cliContainer');cont.innerHTML='';
  SO.forEach(s=>{
    let lista=state.clientes.filter(c=>c.status===s.v);
    if(filtroNome) lista=lista.filter(c=>c.nome.toLowerCase().includes(filtroNome));
    if(!lista.length) return;
    const blk=document.createElement('div');blk.className='mb';
    const bodyId='sb-'+s.v;
    const isOpen=openPanels.has('st-'+s.v);
    blk.innerHTML=`
      <div class="mh" onclick="toggleStatusGrp('${s.v}','${bodyId}',this)">
        <div class="mt"><span class="${s.c}">${s.l}</span></div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="mc">${lista.length} cliente${lista.length>1?'s':''}</span>
          <span class="mch${isOpen?' open':''}">▾</span>
        </div>
      </div>
      <div class="mbody${isOpen?' open':''}" id="${bodyId}">
        ${lista.map(c=>rowHTML(c)).join('')}
      </div>`;
    cont.appendChild(blk);
    bindRowEvents(blk);
  });
  if(!cont.innerHTML) cont.innerHTML='<div style="padding:1rem;color:var(--t2);font-size:13px">Nenhum cliente encontrado.</div>';
}

function toggleStatusGrp(v,bodyId,hdr){
  const body=document.getElementById(bodyId);
  const chev=hdr.querySelector('.mch');
  const isO=body.classList.contains('open');
  body.classList.toggle('open',!isO);
  chev.classList.toggle('open',!isO);
  if(!isO) openPanels.add('st-'+v); else openPanels.delete('st-'+v);
}

function renderClientesPorMes(){
  const cont=document.getElementById('cliContainer');cont.innerHTML='';
  const grupos={};
  state.clientes.forEach(c=>{if(!grupos[c.mes])grupos[c.mes]=[];grupos[c.mes].push(c);});
  const filtroAtivo=!!(filtroNome||filtroStatus);
  mesesAtivos().forEach(mes=>{
    let lista=(grupos[mes]||[]);
    if(filtroNome) lista=lista.filter(c=>c.nome.toLowerCase().includes(filtroNome));
    if(filtroStatus) lista=lista.filter(c=>c.status===filtroStatus);
    // esconde o mês somente se houver filtro ativo e nada bater; sem filtro, mostra sempre (mesmo vazio) p/ permitir adicionar cliente
    if(filtroAtivo && !lista.length) return;
    const pend=lista.filter(c=>c.status==='aguardando_doc'||c.status==='pendente_assinatura').length;
    const blk=document.createElement('div');blk.className='mb';
    const bodyId='mb-'+mes.replace(/[^a-z0-9]/gi,'');
    const isOpen=openPanels.has('mes-'+mes);
    blk.innerHTML=`
      <div class="mh" onclick="toggleMes('${mes}','${bodyId}',this)">
        <div class="mt">${mes}${pend?` <span class="mp">${pend} pendente${pend>1?'s':''}</span>`:''}</div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="mc">${lista.length} cliente${lista.length>1?'s':''}</span>
          <span class="mch${isOpen?' open':''}">▾</span>
        </div>
      </div>
      <div class="mbody${isOpen?' open':''}" id="${bodyId}">
        ${lista.map(c=>rowHTML(c)).join('')}
        <div class="add-cli" onclick="addCli('${mes}')">＋ Adicionar cliente</div>
      </div>`;
    cont.appendChild(blk);
    bindRowEvents(blk);
  });
}

function bindRowEvents(blk){
  blk.querySelectorAll('.cl').forEach(el=>{
    el.addEventListener('click',e=>{
      if(e.target.tagName==='BUTTON'||e.target.tagName==='INPUT'||e.target.tagName==='SELECT') return;
      const pid='panel-'+el.dataset.cid;
      const panel=document.getElementById(pid);
      if(!panel) return;
      const isO=panel.classList.contains('open');
      panel.classList.toggle('open',!isO);
      if(!isO) openPanels.add(pid); else openPanels.delete(pid);
    });
  });
  blk.querySelectorAll('.arqbtn').forEach(el=>el.addEventListener('click',e=>{
    e.stopPropagation();
    const c=state.clientes.find(x=>x.id===el.dataset.cid);
    if(c){c.arquivado=!c.arquivado;save();renderClientes();}
  }));
  blk.querySelectorAll('.psel').forEach(el=>el.addEventListener('change',e=>{
    const c=state.clientes.find(x=>x.id===el.dataset.cid);
    if(c){c.status=el.value;save();renderClientes();}
  }));
  blk.querySelectorAll('.pinp').forEach(el=>el.addEventListener('change',e=>{
    const c=state.clientes.find(x=>x.id===el.dataset.cid);
    if(c){c.obs=el.value;save();}
  }));
  blk.querySelectorAll('.dcb').forEach(el=>el.addEventListener('change',e=>{
    const c=state.clientes.find(x=>x.id===el.dataset.cid);
    if(c){c.docs[el.dataset.doc]=el.checked;save();
      el.closest('.dc').classList.toggle('ok',el.checked);}
  }));
  blk.querySelectorAll('.delbtn').forEach(el=>el.addEventListener('click',e=>{
    e.stopPropagation();
    if(confirm('Remover este cliente?')){state.clientes=state.clientes.filter(x=>x.id!==el.dataset.cid);save();renderClientes();}
  }));
}

function rowHTML(c){
  const sc=stCls(c.status),sl=stLbl(c.status);
  const pid='panel-'+c.id;
  const isOpen=openPanels.has(pid);
  const sopts=SO.map(s=>`<option value="${s.v}" ${c.status===s.v?'selected':''}>${s.l}</option>`).join('');
  const dchips=DOCS.map(d=>`<label class="dc ${c.docs[d]?'ok':''}"><input type="checkbox" class="dcb" data-cid="${c.id}" data-doc="${d}" ${c.docs[d]?'checked':''}>${d}</label>`).join('');
  return `
    <div class="cl" data-cid="${c.id}">
      <div class="cl-arq">
        <button class="arqbtn" data-cid="${c.id}" style="background:none;border:none;cursor:pointer;font-size:11px;font-weight:600;padding:3px 8px;border-radius:20px;${c.arquivado?'background:#f0fdf4;color:#166534;border:.5px solid #86efac':'background:#f9fafb;color:#9ca3af;border:.5px solid #e5e7eb'}">${c.arquivado?'● Arquivado':'○ Não arq.'}</button>
      </div>
      <div class="cl-nome">${mask(c.nome)}</div>
      <div class="cl-obs">${c.obs||'<span style="color:#d1d5db">—</span>'}</div>
      <div class="cl-st"><span class="${sc}">${sl}</span></div>
      <div class="cl-del"><button class="delbtn" data-cid="${c.id}">✕</button></div>
    </div>
    <div class="cpanel${isOpen?' open':''}" id="${pid}">
      <div class="pg">
        <div><div class="pl">Status</div><select class="psel" data-cid="${c.id}">${sopts}</select></div>
        <div><div class="pl">Observação</div><input class="pinp" type="text" value="${c.obs||''}" placeholder="Anotação..." data-cid="${c.id}"></div>
        <div><div class="pl">Contrato arquivado</div>
          <label class="parq"><input type="checkbox" class="arqbtn" data-cid="${c.id}" ${c.arquivado?'checked':''} style="accent-color:var(--g2)"><span style="font-size:13px">${c.arquivado?'Sim, arquivado':'Não arquivado'}</span></label>
        </div>
      </div>
      <div class="dlbl">Documentos recebidos</div>
      <div class="dg">${dchips}</div>
    </div>`;
}

function toggleMes(mes,bodyId,hdr){
  const body=document.getElementById(bodyId);
  const chev=hdr.querySelector('.mch');
  const isO=body.classList.contains('open');
  body.classList.toggle('open',!isO);
  chev.classList.toggle('open',!isO);
  if(!isO) openPanels.add('mes-'+mes); else openPanels.delete('mes-'+mes);
}

function addCli(mes){
  const nome=prompt('Nome do cliente:');
  if(!nome||!nome.trim()) return;
  const id='c'+Date.now();
  state.clientes.push({id,mes,nome:nome.trim(),status:'arquivado',obs:'',arquivado:false,docs:{}});
  save();renderClientes();
}

// ── PIPELINE ───────────────────────────────────────────────────────
function maskPipe(nome){
  const partes=nome.trim().split(/\s+/);
  if(partes.length<=1) return partes[0];
  const primeiro=partes[0];
  const sobrenomes=partes.slice(1).filter(p=>p.length>0).map(p=>p[0].toUpperCase()+'.');
  return primeiro+' '+sobrenomes.join(' ');
}
function renderPipe(){
  document.getElementById('pgrid').innerHTML=state.pipeline.map(p=>`
    <div class="pcard">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div><div class="pnome">${maskPipe(p.nome)}</div><div class="pst">${p.status||'—'}</div></div>
        <button onclick="delPipe('${p.id}')" style="background:none;border:none;color:#d1d5db;cursor:pointer;font-size:13px;padding:2px 5px;border-radius:4px;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#d1d5db'">✕</button>
      </div>
      <input class="pobs" type="text" placeholder="Observação..." value="${p.obs||''}" data-pid="${p.id}" onchange="upPipe(this)">
    </div>`).join('');
}
function addPipe(){
  const n=document.getElementById('pnome').value.trim(),s=document.getElementById('pst').value.trim();
  if(!n) return;
  state.pipeline.push({id:'p'+Date.now(),nome:n,status:s,obs:''});
  document.getElementById('pnome').value='';document.getElementById('pst').value='';
  save();renderPipe();
}
function delPipe(id){if(!confirm('Remover?'))return;state.pipeline=state.pipeline.filter(p=>p.id!==id);save();renderPipe();}
function upPipe(el){const p=state.pipeline.find(x=>x.id===el.dataset.pid);if(p){p.obs=el.value;save();}}

// ── WORKSHOPS ──────────────────────────────────────────────────────
function renderWS(){
  const cont=document.getElementById('wsContent');
  cont.innerHTML='';
  state.workshops.forEach(w=>{
    if(!w.participantes) w.participantes=[];
    const parts=w.participantes;
    const bodyId='wsb-'+w.id;
    const isOpen=openPanels.has('ws-'+w.id);
    const blk=document.createElement('div');blk.className='mb';
    blk.innerHTML=`
      <div class="mh" onclick="toggleWS('${w.id}','${bodyId}',this)">
        <div class="mt">${w.nome}</div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="mc">${parts.length} participante${parts.length!==1?'s':''}</span>
          <span class="mch${isOpen?' open':''}">▾</span>
        </div>
      </div>
      <div class="mbody${isOpen?' open':''}" id="${bodyId}">
        <div style="padding:.8rem 1.1rem;border-bottom:.5px solid var(--bd);display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
          <div><div class="pl">Inscrições</div><input type="number" min="0" value="${w.i||0}" data-wid="${w.id}" data-f="i" class="wsInp" style="width:100%;border:.5px solid #d1d5db;border-radius:5px;padding:3px 5px;font-size:12px;text-align:center"></div>
          <div><div class="pl">Pré-qualif.</div><input type="number" min="0" value="${w.p||0}" data-wid="${w.id}" data-f="p" class="wsInp" style="width:100%;border:.5px solid #d1d5db;border-radius:5px;padding:3px 5px;font-size:12px;text-align:center"></div>
          <div><div class="pl">Qualificados</div><input type="number" min="0" value="${w.q||0}" data-wid="${w.id}" data-f="q" class="wsInp" style="width:100%;border:.5px solid #d1d5db;border-radius:5px;padding:3px 5px;font-size:12px;text-align:center"></div>
          <div><div class="pl">Assinados</div><input type="number" min="0" value="${w.a||0}" data-wid="${w.id}" data-f="a" class="wsInp" style="width:100%;border:.5px solid #d1d5db;border-radius:5px;padding:3px 5px;font-size:12px;text-align:center"></div>
          <div><div class="pl">Aguardando</div><input type="number" min="0" value="${w.ag||0}" data-wid="${w.id}" data-f="ag" class="wsInp" style="width:100%;border:.5px solid #d1d5db;border-radius:5px;padding:3px 5px;font-size:12px;text-align:center"></div>
        </div>
        <div style="padding:.7rem 1.1rem">
          <div class="dlbl" style="margin-bottom:8px">Participantes (nome e observação)</div>
          ${parts.map(pt=>`
            <div style="display:flex;gap:6px;margin-bottom:6px;align-items:center">
              <input type="text" value="${pt.nome}" placeholder="Nome" data-wid="${w.id}" data-pid="${pt.id}" data-f="nome" class="wsPartInp" style="flex:1;min-width:0;border:.5px solid #d1d5db;border-radius:5px;padding:5px 8px;font-size:12px;font-family:inherit">
              <input type="text" value="${pt.obs||''}" placeholder="Observação..." data-wid="${w.id}" data-pid="${pt.id}" data-f="obs" class="wsPartInp" style="flex:1.4;min-width:0;border:.5px solid #d1d5db;border-radius:5px;padding:5px 8px;font-size:12px;font-family:inherit">
              <button onclick="delWSPart('${w.id}','${pt.id}')" style="background:none;border:none;color:#d1d5db;cursor:pointer;font-size:13px;flex-shrink:0" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#d1d5db'">✕</button>
            </div>`).join('')}
          <div class="add-cli" style="border-top:none;padding:.4rem 0" onclick="addWSPart('${w.id}')">＋ Adicionar participante</div>
        </div>
        <div style="padding:0 1.1rem .8rem"><button onclick="delWS('${w.id}')" style="background:none;border:none;color:#ef4444;font-size:11px;cursor:pointer;font-family:inherit">Remover workshop</button></div>
      </div>`;
    cont.appendChild(blk);
  });
  document.querySelectorAll('.wsInp').forEach(el=>el.addEventListener('change',e=>{
    const w=state.workshops.find(x=>x.id===el.dataset.wid);
    if(w){w[el.dataset.f]=Math.max(0,+el.value||0);save();renderWS();}
  }));
  document.querySelectorAll('.wsPartInp').forEach(el=>el.addEventListener('change',e=>{
    const w=state.workshops.find(x=>x.id===el.dataset.wid);
    const pt=w&&w.participantes.find(p=>p.id===el.dataset.pid);
    if(pt){pt[el.dataset.f]=el.value;save();}
  }));
  const totais={i:sum(state.workshops.map(w=>w.i||0)),p:sum(state.workshops.map(w=>w.p||0)),q:sum(state.workshops.map(w=>w.q||0)),a:sum(state.workshops.map(w=>w.a||0)),ag:sum(state.workshops.map(w=>w.ag||0))};
  const totCard=document.createElement('div');
  totCard.className='card';
  totCard.style.marginTop='4px';
  totCard.innerHTML=`<div class="ch">Total Geral</div>
    <div style="display:flex;gap:18px;flex-wrap:wrap;font-size:12px">
      <div><span style="color:var(--t2)">Inscrições:</span> <strong>${totais.i}</strong></div>
      <div><span style="color:var(--t2)">Pré-qualif.:</span> <strong>${totais.p}</strong></div>
      <div><span style="color:var(--t2)">Qualificados:</span> <strong>${totais.q}</strong></div>
      <div><span class="bdg bok">Assinados: ${totais.a}</span></div>
      <div><span class="bdg bwarn">Aguardando: ${totais.ag}</span></div>
    </div>`;
  cont.appendChild(totCard);
  const addBar=document.createElement('div');
  addBar.style.cssText='display:flex;gap:8px;margin-top:12px;flex-wrap:wrap';
  addBar.innerHTML=`<input id="wsNovoNome" placeholder="Nome do workshop..." style="flex:1;min-width:160px;border:.5px solid #d1d5db;border-radius:6px;padding:6px 9px;font-size:13px;font-family:inherit" onkeydown="if(event.key==='Enter')addWS()">
    <button class="btn bsave" onclick="addWS()">+ Adicionar Workshop</button>`;
  cont.appendChild(addBar);
}
function toggleWS(id,bodyId,hdr){
  const body=document.getElementById(bodyId);
  const chev=hdr.querySelector('.mch');
  const isO=body.classList.contains('open');
  body.classList.toggle('open',!isO);
  chev.classList.toggle('open',!isO);
  if(!isO) openPanels.add('ws-'+id); else openPanels.delete('ws-'+id);
}
function addWSPart(wid){
  const w=state.workshops.find(x=>x.id===wid);
  if(!w) return;
  if(!w.participantes) w.participantes=[];
  w.participantes.push({id:'wp'+Date.now(),nome:'',obs:''});
  openPanels.add('ws-'+wid);
  save();renderWS();
}
function delWSPart(wid,pid){
  const w=state.workshops.find(x=>x.id===wid);
  if(!w) return;
  w.participantes=w.participantes.filter(p=>p.id!==pid);
  save();renderWS();
}
function addWS(){
  const inp=document.getElementById('wsNovoNome');
  const nome=inp.value.trim();
  if(!nome) return;
  state.workshops.push({id:'w'+Date.now(),nome,i:0,p:0,q:0,a:0,ag:0,participantes:[]});
  save();renderWS();
}
function delWS(id){
  if(!confirm('Remover este workshop?')) return;
  state.workshops=state.workshops.filter(w=>w.id!==id);
  save();renderWS();
}

// ── RENOVAÇÕES ─────────────────────────────────────────────────────
function renderRenov(){
  const tb=document.getElementById('renovBody');tb.innerHTML='';
  MESES.forEach((m,i)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${m}</td>
      <td><input type="number" min="0" max="99" value="${state.com.renov[i]}" data-i="${i}" style="border:.5px solid #d1d5db;border-radius:5px;padding:2px 4px;font-size:12px;text-align:center;background:#fefce8;width:50px;font-family:inherit"></td>
      <td><input type="text" value="${state.com.renovObs[i]||''}" data-i="${i}" placeholder="observação..." style="width:100%;border:.5px solid #d1d5db;border-radius:5px;padding:3px 7px;font-size:12px;font-family:inherit"></td>`;
    tb.appendChild(tr);
  });
  tb.querySelectorAll('input[type=number]').forEach(el=>el.addEventListener('change',e=>{state.com.renov[+e.target.dataset.i]=Math.max(0,+e.target.value||0);save();renderRenov();}));
  tb.querySelectorAll('input[type=text]').forEach(el=>el.addEventListener('change',e=>{state.com.renovObs[+e.target.dataset.i]=e.target.value;save();}));
  document.getElementById('renovTotal').innerHTML=`${sum(state.com.renov)} <span style="font-size:14px;font-weight:400;color:var(--t2)">renovações em 2026</span>`;
}

// ── EXPORTAR / IMPORTAR ────────────────────────────────────────────
function exportar(){const b=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='comercial_rural_2026.json';a.click();URL.revokeObjectURL(a.href);toast('Exportado!');}
function importar(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{state=JSON.parse(ev.target.result);save();renderAll();toast('Importado!');}catch{toast('Arquivo inválido.');}};r.readAsText(f);e.target.value='';}
function resetar(){if(confirm('Resetar todos os dados?')){state=getDefaults();save();renderAll();toast('Resetado.');}}

function renderAll(){renderCom();renderClientes();renderPipe();renderWS();renderRenov();renderMaq();atualizarTituloAba();}

// ── LEMBRETES ──────────────────────────────────────────────────────
const STATUS_PEND=new Set(['aguardando_doc','pendente_assinatura','ext_aberto','credenciamento','buscar']);

const PRIO_STATUS={
  'buscar':1,'aguardando_notas':1,
  'credenciamento':2,'ext_aberto':2,
  'aguardando_doc':3,'pendente_assinatura':3,
};
const PRIO_OBS=/nota|nfe|nf|fiscal|fatura/i;

function getPrioridade(c){
  if(c.status==='buscar') return 1;
  if(c.status==='aguardando_notas') return 1;
  if(PRIO_OBS.test(c.obs||'')) return 1;
  return PRIO_STATUS[c.status]||4;
}

function getPendentes(){
  return state.clientes
    .filter(c=>STATUS_PEND.has(c.status))
    .sort((a,b)=>getPrioridade(a)-getPrioridade(b));
}

function atualizarTituloAba(){
  const n=getPendentes().length;
  document.title=n>0?`(${n}) COMERCIAL RURAL`:'COMERCIAL RURAL';
}

function mostrarLembrete(){
  const pend=getPendentes();
  if(!pend.length) return;
  if(document.getElementById('lembreteOverlay')) return;

  const itens=pend.map(c=>{
    const sc=stCls(c.status),sl=stLbl(c.status);
    const prio=getPrioridade(c);
    const prioTag=prio===1
      ?`<span style="font-size:10px;font-weight:700;background:#fee2e2;color:#991b1b;padding:1px 7px;border-radius:20px;margin-left:6px">🔴 Notas</span>`
      :prio===2
      ?`<span style="font-size:10px;font-weight:700;background:#fef3c7;color:#92400e;padding:1px 7px;border-radius:20px;margin-left:6px">🟡 Credenciamento</span>`
      :'';
    return `<div class="lembrete-item">
      <span class="lembrete-mes">${c.mes}</span>
      <div style="flex:1">
        <div class="lembrete-nome">${mask(c.nome)}${prioTag}</div>
        ${c.obs?`<div class="lembrete-obs">${c.obs}</div>`:''}
      </div>
      <span class="lembrete-st ${sc}">${sl}</span>
    </div>`;
  }).join('');

  const overlay=document.createElement('div');
  overlay.className='lembrete-overlay';
  overlay.id='lembreteOverlay';
  overlay.innerHTML=`
    <div class="lembrete-box">
      <div class="lembrete-header">
        <div class="lembrete-titulo">
          🔔 Pendências do dia
          <span class="badge-pend">${pend.length}</span>
        </div>
        <button class="lembrete-fechar" onclick="fecharLembrete()">✕</button>
      </div>
      <div style="font-size:12px;color:var(--t2);margin-bottom:.75rem">Estes clientes precisam de atenção hoje:</div>
      ${itens}
      <div class="lembrete-footer">
        <button class="btn-copiar" onclick="copiarPendentes()">📋 Copiar lista para WhatsApp</button>
        <button class="btn-ignorar" onclick="fecharLembrete()">Fechar</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click',e=>{if(e.target===overlay)fecharLembrete();});
}

function fecharLembrete(){
  const el=document.getElementById('lembreteOverlay');
  if(el) el.remove();
}

function copiarPendentes(){
  const pend=getPendentes();
  const hoje=new Date().toLocaleDateString('pt-BR');
  const linhas=pend.map(c=>{
    const prio=getPrioridade(c);
    const tag=prio===1?'🔴':prio===2?'🟡':'🔵';
    return `${tag} ${mask(c.nome)} (${c.mes}) — ${stLbl(c.status)}${c.obs?' | '+c.obs:''}`;
  }).join('\n');
  const txt=`📋 *Pendências Comercial Rural — ${hoje}*\n\n${linhas}\n\nTotal: ${pend.length} cliente${pend.length>1?'s':''}`;
  navigator.clipboard.writeText(txt).then(()=>{toast('Lista copiada! Cole no WhatsApp.');}).catch(()=>{
    const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();toast('Lista copiada!');
  });
}

// ── MAQUINÁRIOS ────────────────────────────────────────────────────
function renderMaq(){
  const cont=document.getElementById('maqContainer');
  cont.innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
      <div class="card" style="grid-column:1/-1">
        <div class="ch">Cadastrar Maquinário</div>
        <div id="dropZone" style="border:1.5px dashed var(--bd);border-radius:10px;padding:1.5rem 1rem;text-align:center;cursor:pointer;transition:.2s;background:#fafaf9;position:relative;margin-bottom:10px"
          onclick="document.getElementById('maqFile').click()"
          ondragover="event.preventDefault();this.style.borderColor='var(--g2)';this.style.background='#f0fdf4'"
          ondragleave="this.style.borderColor='var(--bd)';this.style.background='#fafaf9'"
          ondrop="handleDrop(event)">
          <div style="font-size:2rem;margin-bottom:.5rem">🚜</div>
          <div style="font-weight:500;color:var(--g1);margin-bottom:4px" id="maqFotoLbl">Arraste a foto ou clique para selecionar</div>
          <div style="font-size:11px;color:var(--t2)">JPG, PNG, WEBP</div>
          <input type="file" id="maqFile" accept="image/*" style="display:none" onchange="prepararFotoMaq(this.files[0])">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <input id="maqMarca" placeholder="Marca (ex: John Deere)" style="border:.5px solid #d1d5db;border-radius:6px;padding:6px 9px;font-size:13px;font-family:inherit">
          <input id="maqModelo" placeholder="Modelo (ex: 6110J)" style="border:.5px solid #d1d5db;border-radius:6px;padding:6px 9px;font-size:13px;font-family:inherit">
          <select id="maqCategoria" style="border:.5px solid #d1d5db;border-radius:6px;padding:6px 9px;font-size:13px;font-family:inherit">
            <option value="Trator">Trator</option>
            <option value="Colheitadeira">Colheitadeira</option>
            <option value="Pulverizador">Pulverizador</option>
            <option value="Plantadeira">Plantadeira</option>
            <option value="Grade">Grade</option>
            <option value="Implemento">Implemento</option>
            <option value="Caminhão">Caminhão</option>
            <option value="Outro">Outro</option>
          </select>
          <select id="maqConservacao" style="border:.5px solid #d1d5db;border-radius:6px;padding:6px 9px;font-size:13px;font-family:inherit">
            <option value="Ótimo">Ótimo</option>
            <option value="Bom">Bom</option>
            <option value="Regular">Regular</option>
            <option value="Ruim">Ruim</option>
          </select>
          <input id="maqAno" placeholder="Ano (ex: 2018)" style="border:.5px solid #d1d5db;border-radius:6px;padding:6px 9px;font-size:13px;font-family:inherit">
          <input id="maqPotencia" placeholder="Potência (ex: 120 CV)" style="border:.5px solid #d1d5db;border-radius:6px;padding:6px 9px;font-size:13px;font-family:inherit">
          <input id="maqObs" placeholder="Observações" style="grid-column:1/-1;border:.5px solid #d1d5db;border-radius:6px;padding:6px 9px;font-size:13px;font-family:inherit">
        </div>
        <button class="btn bsave" style="margin-top:10px" onclick="salvarMaq()">+ Salvar Maquinário</button>
        <div id="maqStatus" style="margin-top:10px;display:none"></div>
      </div>
    </div>
    <div id="maqResultados" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px"></div>`;
  renderResultados();
}

let maqFotoAtual=null;

function handleDrop(e){
  e.preventDefault();
  document.getElementById('dropZone').style.borderColor='var(--bd)';
  document.getElementById('dropZone').style.background='#fafaf9';
  const f=e.dataTransfer.files[0];
  if(f&&f.type.startsWith('image/')) prepararFotoMaq(f);
}

function prepararFotoMaq(file){
  if(!file) return;
  const r=new FileReader();
  r.onload=()=>{
    maqFotoAtual={data:r.result,mediaType:file.type||'image/jpeg',nomeArquivo:file.name};
    document.getElementById('maqFotoLbl').textContent='✓ Foto selecionada: '+file.name;
  };
  r.readAsDataURL(file);
}

function salvarMaq(){
  const marca=document.getElementById('maqMarca').value.trim()||'Não identificado';
  const modelo=document.getElementById('maqModelo').value.trim()||'Não identificado';
  const categoria=document.getElementById('maqCategoria').value;
  const conservacao=document.getElementById('maqConservacao').value;
  const anoEstimado=document.getElementById('maqAno').value.trim()||'Não identificado';
  const potenciaCV=document.getElementById('maqPotencia').value.trim()||'Não identificado';
  const observacoes=document.getElementById('maqObs').value.trim();
  if(!maqFotoAtual&&!marca&&!modelo){
    const st=document.getElementById('maqStatus');
    st.style.display='block';
    st.innerHTML=`<div class="ins" style="background:#fee2e2;color:#991b1b;margin:0">Adicione ao menos uma foto ou marca/modelo.</div>`;
    return;
  }
  state.maquinarios.unshift({
    id:'m'+Date.now(),
    thumb:maqFotoAtual?maqFotoAtual.data:'',
    arquivo:maqFotoAtual?maqFotoAtual.nomeArquivo:'',
    marca,modelo,categoria,anoEstimado,conservacao,potenciaCV,observacoes,
    data:new Date().toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})
  });
  save();
  maqFotoAtual=null;
  ['maqMarca','maqModelo','maqAno','maqPotencia','maqObs'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('maqFotoLbl').textContent='Arraste a foto ou clique para selecionar';
  const st=document.getElementById('maqStatus');
  st.style.display='block';
  st.innerHTML=`<div class="ins iok" style="margin:0">✓ Maquinário salvo — ${marca} ${modelo}</div>`;
  renderResultados();
}

function consv(v){const m={Ótimo:'#dcfce7|#166534',Bom:'#dbeafe|#1e40af',Regular:'#fef3c7|#92400e',Ruim:'#fee2e2|#991b1b'};const[bg,cl]=(m[v]||'#f3f4f6|#374151').split('|');return `background:${bg};color:${cl}`;}
function conf(v){const m={Alta:'#dcfce7|#166534',Média:'#fef3c7|#92400e',Baixa:'#fee2e2|#991b1b'};const[bg,cl]=(m[v]||'#f3f4f6|#374151').split('|');return `background:${bg};color:${cl}`;}

function renderResultados(){
  const el=document.getElementById('maqResultados');if(!el) return;
  if(!state.maquinarios.length){el.innerHTML='<div style="font-size:13px;color:var(--t2);grid-column:1/-1;padding:.5rem 0">Nenhum maquinário cadastrado ainda.</div>';return;}
  el.innerHTML=state.maquinarios.map(m=>`
    <div class="card" style="position:relative">
      <button onclick="delMaq('${m.id}')" style="position:absolute;top:10px;right:10px;background:none;border:none;color:#d1d5db;cursor:pointer;font-size:14px;border-radius:4px;padding:2px 5px" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#d1d5db'">✕</button>
      ${m.thumb?`<img src="${m.thumb}" style="width:100%;height:160px;object-fit:cover;border-radius:8px;margin-bottom:10px;border:.5px solid var(--bd)">`:''}
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px">
        <div>
          <div style="font-weight:600;font-size:14px;color:var(--g1)">${m.marca}</div>
          <div style="font-size:13px;color:var(--text)">${m.modelo}</div>
        </div>
        <span class="bdg" style="font-size:10px;${consv(m.conservacao)}">${m.conservacao}</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px">
        <span class="bdg bnd" style="font-size:10px">${m.categoria}</span>
        ${m.anoEstimado&&m.anoEstimado!=='Não identificado'?`<span class="bdg bnd" style="font-size:10px">📅 ${m.anoEstimado}</span>`:''}
        ${m.potenciaCV&&m.potenciaCV!=='Não identificado'?`<span class="bdg bnd" style="font-size:10px">⚡ ${m.potenciaCV}</span>`:''}
      </div>
      ${m.observacoes?`<div style="font-size:12px;color:var(--t2);line-height:1.5;border-top:.5px solid var(--bd);padding-top:7px;margin-top:4px">${m.observacoes}</div>`:''}
      <div style="font-size:10px;color:var(--t2);margin-top:6px">${m.data}</div>
    </div>`).join('');
}

function delMaq(id){if(!confirm('Remover esta análise?'))return;state.maquinarios=state.maquinarios.filter(m=>m.id!==id);save();renderResultados();}
(async()=>{
  state=await loadState();
  renderAll();
  updLbl();
  setInterval(updLbl,60000);
})();
