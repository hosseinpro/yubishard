'use strict';

/* Wordlists: SLIP-39 (1024) and BIP-39 English (2048) */

const SLIP39_WORDS = (
  'academic,acid,acne,acquire,acrobat,activity,actress,adapt,adequate,adjust,admit,adorn,' +
  'adult,advance,advocate,afraid,again,agency,agree,aide,aircraft,airline,airport,ajar,' +
  'alarm,album,alcohol,alien,alive,alpha,already,alto,aluminum,always,amazing,ambition,' +
  'amount,amuse,analysis,anatomy,ancestor,ancient,angel,angry,animal,answer,antenna,anxiety,' +
  'apart,aquatic,arcade,arena,argue,armed,artist,artwork,aspect,auction,august,aunt,' +
  'average,aviation,avoid,award,away,axis,axle,beam,beard,beaver,become,bedroom,' +
  'behavior,being,believe,belong,benefit,best,beyond,bike,biology,birthday,bishop,black,' +
  'blanket,blessing,blimp,blind,blue,body,bolt,boring,born,both,boundary,bracelet,' +
  'branch,brave,breathe,briefing,broken,brother,browser,bucket,budget,building,bulb,bulge,' +
  'bumpy,bundle,burden,burning,busy,buyer,cage,calcium,camera,campus,canyon,capacity,' +
  'capital,capture,carbon,cards,careful,cargo,carpet,carve,category,cause,ceiling,center,' +
  'ceramic,champion,change,charity,check,chemical,chest,chew,chubby,cinema,civil,class,' +
  'clay,cleanup,client,climate,clinic,clock,clogs,closet,clothes,club,cluster,coal,' +
  'coastal,coding,column,company,corner,costume,counter,course,cover,cowboy,cradle,craft,' +
  'crazy,credit,cricket,criminal,crisis,critical,crowd,crucial,crunch,crush,crystal,cubic,' +
  'cultural,curious,curly,custody,cylinder,daisy,damage,dance,darkness,database,daughter,deadline,' +
  'deal,debris,debut,decent,decision,declare,decorate,decrease,deliver,demand,density,deny,' +
  'depart,depend,depict,deploy,describe,desert,desire,desktop,destroy,detailed,detect,device,' +
  'devote,diagnose,dictate,diet,dilemma,diminish,dining,diploma,disaster,discuss,disease,dish,' +
  'dismiss,display,distance,dive,divorce,document,domain,domestic,dominant,dough,downtown,dragon,' +
  'dramatic,dream,dress,drift,drink,drove,drug,dryer,duckling,duke,duration,dwarf,' +
  'dynamic,early,earth,easel,easy,echo,eclipse,ecology,edge,editor,educate,either,' +
  'elbow,elder,election,elegant,element,elephant,elevator,elite,else,email,emerald,emission,' +
  'emperor,emphasis,employer,empty,ending,endless,endorse,enemy,energy,enforce,engage,enjoy,' +
  'enlarge,entrance,envelope,envy,epidemic,episode,equation,equip,eraser,erode,escape,estate,' +
  'estimate,evaluate,evening,evidence,evil,evoke,exact,example,exceed,exchange,exclude,excuse,' +
  'execute,exercise,exhaust,exotic,expand,expect,explain,express,extend,extra,eyebrow,facility,' +
  'fact,failure,faint,fake,false,family,famous,fancy,fangs,fantasy,fatal,fatigue,' +
  'favorite,fawn,fiber,fiction,filter,finance,findings,finger,firefly,firm,fiscal,fishing,' +
  'fitness,flame,flash,flavor,flea,flexible,flip,float,floral,fluff,focus,forbid,' +
  'force,forecast,forget,formal,fortune,forward,founder,fraction,fragment,frequent,freshman,friar,' +
  'fridge,friendly,frost,froth,frozen,fumes,funding,furl,fused,galaxy,game,garbage,' +
  'garden,garlic,gasoline,gather,general,genius,genre,genuine,geology,gesture,glad,glance,' +
  'glasses,glen,glimpse,goat,golden,graduate,grant,grasp,gravity,gray,greatest,grief,' +
  'grill,grin,grocery,gross,group,grownup,grumpy,guard,guest,guilt,guitar,gums,' +
  'hairy,hamster,hand,hanger,harvest,have,havoc,hawk,hazard,headset,health,hearing,' +
  'heat,helpful,herald,herd,hesitate,hobo,holiday,holy,home,hormone,hospital,hour,' +
  'huge,human,humidity,hunting,husband,hush,husky,hybrid,idea,identify,idle,image,' +
  'impact,imply,improve,impulse,include,income,increase,index,indicate,industry,infant,inform,' +
  'inherit,injury,inmate,insect,inside,install,intend,intimate,invasion,involve,iris,island,' +
  'isolate,item,ivory,jacket,jerky,jewelry,join,judicial,juice,jump,junction,junior,' +
  'junk,jury,justice,kernel,keyboard,kidney,kind,kitchen,knife,knit,laden,ladle,' +
  'ladybug,lair,lamp,language,large,laser,laundry,lawsuit,leader,leaf,learn,leaves,' +
  'lecture,legal,legend,legs,lend,length,level,liberty,library,license,lift,likely,' +
  'lilac,lily,lips,liquid,listen,literary,living,lizard,loan,lobe,location,losing,' +
  'loud,loyalty,luck,lunar,lunch,lungs,luxury,lying,lyrics,machine,magazine,maiden,' +
  'mailman,main,makeup,making,mama,manager,mandate,mansion,manual,marathon,march,market,' +
  'marvel,mason,material,math,maximum,mayor,meaning,medal,medical,member,memory,mental,' +
  'merchant,merit,method,metric,midst,mild,military,mineral,minister,miracle,mixed,mixture,' +
  'mobile,modern,modify,moisture,moment,morning,mortgage,mother,mountain,mouse,move,much,' +
  'mule,multiple,muscle,museum,music,mustang,nail,national,necklace,negative,nervous,network,' +
  'news,nuclear,numb,numerous,nylon,oasis,obesity,object,observe,obtain,ocean,often,' +
  'olympic,omit,oral,orange,orbit,order,ordinary,organize,ounce,oven,overall,owner,' +
  'paces,pacific,package,paid,painting,pajamas,pancake,pants,papa,paper,parcel,parking,' +
  'party,patent,patrol,payment,payroll,peaceful,peanut,peasant,pecan,penalty,pencil,percent,' +
  'perfect,permit,petition,phantom,pharmacy,photo,phrase,physics,pickup,picture,piece,pile,' +
  'pink,pipeline,pistol,pitch,plains,plan,plastic,platform,playoff,pleasure,plot,plunge,' +
  'practice,prayer,preach,predator,pregnant,premium,prepare,presence,prevent,priest,primary,priority,' +
  'prisoner,privacy,prize,problem,process,profile,program,promise,prospect,provide,prune,public,' +
  'pulse,pumps,punish,puny,pupal,purchase,purple,python,quantity,quarter,quick,quiet,' +
  'race,racism,radar,railroad,rainbow,raisin,random,ranked,rapids,raspy,reaction,realize,' +
  'rebound,rebuild,recall,receiver,recover,regret,regular,reject,relate,remember,remind,remove,' +
  'render,repair,repeat,replace,require,rescue,research,resident,response,result,retailer,retreat,' +
  'reunion,revenue,review,reward,rhyme,rhythm,rich,rival,river,robin,rocky,romantic,' +
  'romp,roster,round,royal,ruin,ruler,rumor,sack,safari,salary,salon,salt,' +
  'satisfy,satoshi,saver,says,scandal,scared,scatter,scene,scholar,science,scout,scramble,' +
  'screw,script,scroll,seafood,season,secret,security,segment,senior,shadow,shaft,shame,' +
  'shaped,sharp,shelter,sheriff,short,should,shrimp,sidewalk,silent,silver,similar,simple,' +
  'single,sister,skin,skunk,slap,slavery,sled,slice,slim,slow,slush,smart,' +
  'smear,smell,smirk,smith,smoking,smug,snake,snapshot,sniff,society,software,soldier,' +
  'solution,soul,source,space,spark,speak,species,spelling,spend,spew,spider,spill,' +
  'spine,spirit,spit,spray,sprinkle,square,squeeze,stadium,staff,standard,starting,station,' +
  'stay,steady,step,stick,stilt,story,strategy,strike,style,subject,submit,sugar,' +
  'suitable,sunlight,superior,surface,surprise,survive,sweater,swimming,swing,switch,symbolic,sympathy,' +
  'syndrome,system,tackle,tactics,tadpole,talent,task,taste,taught,taxi,teacher,teammate,' +
  'teaspoon,temple,tenant,tendency,tension,terminal,testify,texture,thank,that,theater,theory,' +
  'therapy,thorn,threaten,thumb,thunder,ticket,tidy,timber,timely,ting,tofu,together,' +
  'tolerate,total,toxic,tracks,traffic,training,transfer,trash,traveler,treat,trend,trial,' +
  'tricycle,trip,triumph,trouble,true,trust,twice,twin,type,typical,ugly,ultimate,' +
  'umbrella,uncover,undergo,unfair,unfold,unhappy,union,universe,unkind,unknown,unusual,unwrap,' +
  'upgrade,upstairs,username,usher,usual,valid,valuable,vampire,vanish,various,vegan,velvet,' +
  'venture,verdict,verify,very,veteran,vexed,victim,video,view,vintage,violence,viral,' +
  'visitor,visual,vitamins,vocal,voice,volume,voter,voting,walnut,warmth,warn,watch,' +
  'wavy,wealthy,weapon,webcam,welcome,welfare,western,width,wildlife,window,wine,wireless,' +
  'wisdom,withdraw,wits,wolf,woman,work,worthy,wrap,wrist,writing,wrote,year,' +
  'yelp,yield,yoga,zero'
).split(',');

const BIP39_WORDS = (
  'abandon,ability,able,about,above,absent,absorb,abstract,absurd,abuse,access,accident,' +
  'account,accuse,achieve,acid,acoustic,acquire,across,act,action,actor,actress,actual,' +
  'adapt,add,addict,address,adjust,admit,adult,advance,advice,aerobic,affair,afford,' +
  'afraid,again,age,agent,agree,ahead,aim,air,airport,aisle,alarm,album,' +
  'alcohol,alert,alien,all,alley,allow,almost,alone,alpha,already,also,alter,' +
  'always,amateur,amazing,among,amount,amused,analyst,anchor,ancient,anger,angle,angry,' +
  'animal,ankle,announce,annual,another,answer,antenna,antique,anxiety,any,apart,apology,' +
  'appear,apple,approve,april,arch,arctic,area,arena,argue,arm,armed,armor,' +
  'army,around,arrange,arrest,arrive,arrow,art,artefact,artist,artwork,ask,aspect,' +
  'assault,asset,assist,assume,asthma,athlete,atom,attack,attend,attitude,attract,auction,' +
  'audit,august,aunt,author,auto,autumn,average,avocado,avoid,awake,aware,away,' +
  'awesome,awful,awkward,axis,baby,bachelor,bacon,badge,bag,balance,balcony,ball,' +
  'bamboo,banana,banner,bar,barely,bargain,barrel,base,basic,basket,battle,beach,' +
  'bean,beauty,because,become,beef,before,begin,behave,behind,believe,below,belt,' +
  'bench,benefit,best,betray,better,between,beyond,bicycle,bid,bike,bind,biology,' +
  'bird,birth,bitter,black,blade,blame,blanket,blast,bleak,bless,blind,blood,' +
  'blossom,blouse,blue,blur,blush,board,boat,body,boil,bomb,bone,bonus,' +
  'book,boost,border,boring,borrow,boss,bottom,bounce,box,boy,bracket,brain,' +
  'brand,brass,brave,bread,breeze,brick,bridge,brief,bright,bring,brisk,broccoli,' +
  'broken,bronze,broom,brother,brown,brush,bubble,buddy,budget,buffalo,build,bulb,' +
  'bulk,bullet,bundle,bunker,burden,burger,burst,bus,business,busy,butter,buyer,' +
  'buzz,cabbage,cabin,cable,cactus,cage,cake,call,calm,camera,camp,can,' +
  'canal,cancel,candy,cannon,canoe,canvas,canyon,capable,capital,captain,car,carbon,' +
  'card,cargo,carpet,carry,cart,case,cash,casino,castle,casual,cat,catalog,' +
  'catch,category,cattle,caught,cause,caution,cave,ceiling,celery,cement,census,century,' +
  'cereal,certain,chair,chalk,champion,change,chaos,chapter,charge,chase,chat,cheap,' +
  'check,cheese,chef,cherry,chest,chicken,chief,child,chimney,choice,choose,chronic,' +
  'chuckle,chunk,churn,cigar,cinnamon,circle,citizen,city,civil,claim,clap,clarify,' +
  'claw,clay,clean,clerk,clever,click,client,cliff,climb,clinic,clip,clock,' +
  'clog,close,cloth,cloud,clown,club,clump,cluster,clutch,coach,coast,coconut,' +
  'code,coffee,coil,coin,collect,color,column,combine,come,comfort,comic,common,' +
  'company,concert,conduct,confirm,congress,connect,consider,control,convince,cook,cool,copper,' +
  'copy,coral,core,corn,correct,cost,cotton,couch,country,couple,course,cousin,' +
  'cover,coyote,crack,cradle,craft,cram,crane,crash,crater,crawl,crazy,cream,' +
  'credit,creek,crew,cricket,crime,crisp,critic,crop,cross,crouch,crowd,crucial,' +
  'cruel,cruise,crumble,crunch,crush,cry,crystal,cube,culture,cup,cupboard,curious,' +
  'current,curtain,curve,cushion,custom,cute,cycle,dad,damage,damp,dance,danger,' +
  'daring,dash,daughter,dawn,day,deal,debate,debris,decade,december,decide,decline,' +
  'decorate,decrease,deer,defense,define,defy,degree,delay,deliver,demand,demise,denial,' +
  'dentist,deny,depart,depend,deposit,depth,deputy,derive,describe,desert,design,desk,' +
  'despair,destroy,detail,detect,develop,device,devote,diagram,dial,diamond,diary,dice,' +
  'diesel,diet,differ,digital,dignity,dilemma,dinner,dinosaur,direct,dirt,disagree,discover,' +
  'disease,dish,dismiss,disorder,display,distance,divert,divide,divorce,dizzy,doctor,document,' +
  'dog,doll,dolphin,domain,donate,donkey,donor,door,dose,double,dove,draft,' +
  'dragon,drama,drastic,draw,dream,dress,drift,drill,drink,drip,drive,drop,' +
  'drum,dry,duck,dumb,dune,during,dust,dutch,duty,dwarf,dynamic,eager,' +
  'eagle,early,earn,earth,easily,east,easy,echo,ecology,economy,edge,edit,' +
  'educate,effort,egg,eight,either,elbow,elder,electric,elegant,element,elephant,elevator,' +
  'elite,else,embark,embody,embrace,emerge,emotion,employ,empower,empty,enable,enact,' +
  'end,endless,endorse,enemy,energy,enforce,engage,engine,enhance,enjoy,enlist,enough,' +
  'enrich,enroll,ensure,enter,entire,entry,envelope,episode,equal,equip,era,erase,' +
  'erode,erosion,error,erupt,escape,essay,essence,estate,eternal,ethics,evidence,evil,' +
  'evoke,evolve,exact,example,excess,exchange,excite,exclude,excuse,execute,exercise,exhaust,' +
  'exhibit,exile,exist,exit,exotic,expand,expect,expire,explain,expose,express,extend,' +
  'extra,eye,eyebrow,fabric,face,faculty,fade,faint,faith,fall,false,fame,' +
  'family,famous,fan,fancy,fantasy,farm,fashion,fat,fatal,father,fatigue,fault,' +
  'favorite,feature,february,federal,fee,feed,feel,female,fence,festival,fetch,fever,' +
  'few,fiber,fiction,field,figure,file,film,filter,final,find,fine,finger,' +
  'finish,fire,firm,first,fiscal,fish,fit,fitness,fix,flag,flame,flash,' +
  'flat,flavor,flee,flight,flip,float,flock,floor,flower,fluid,flush,fly,' +
  'foam,focus,fog,foil,fold,follow,food,foot,force,forest,forget,fork,' +
  'fortune,forum,forward,fossil,foster,found,fox,fragile,frame,frequent,fresh,friend,' +
  'fringe,frog,front,frost,frown,frozen,fruit,fuel,fun,funny,furnace,fury,' +
  'future,gadget,gain,galaxy,gallery,game,gap,garage,garbage,garden,garlic,garment,' +
  'gas,gasp,gate,gather,gauge,gaze,general,genius,genre,gentle,genuine,gesture,' +
  'ghost,giant,gift,giggle,ginger,giraffe,girl,give,glad,glance,glare,glass,' +
  'glide,glimpse,globe,gloom,glory,glove,glow,glue,goat,goddess,gold,good,' +
  'goose,gorilla,gospel,gossip,govern,gown,grab,grace,grain,grant,grape,grass,' +
  'gravity,great,green,grid,grief,grit,grocery,group,grow,grunt,guard,guess,' +
  'guide,guilt,guitar,gun,gym,habit,hair,half,hammer,hamster,hand,happy,' +
  'harbor,hard,harsh,harvest,hat,have,hawk,hazard,head,health,heart,heavy,' +
  'hedgehog,height,hello,helmet,help,hen,hero,hidden,high,hill,hint,hip,' +
  'hire,history,hobby,hockey,hold,hole,holiday,hollow,home,honey,hood,hope,' +
  'horn,horror,horse,hospital,host,hotel,hour,hover,hub,huge,human,humble,' +
  'humor,hundred,hungry,hunt,hurdle,hurry,hurt,husband,hybrid,ice,icon,idea,' +
  'identify,idle,ignore,ill,illegal,illness,image,imitate,immense,immune,impact,impose,' +
  'improve,impulse,inch,include,income,increase,index,indicate,indoor,industry,infant,inflict,' +
  'inform,inhale,inherit,initial,inject,injury,inmate,inner,innocent,input,inquiry,insane,' +
  'insect,inside,inspire,install,intact,interest,into,invest,invite,involve,iron,island,' +
  'isolate,issue,item,ivory,jacket,jaguar,jar,jazz,jealous,jeans,jelly,jewel,' +
  'job,join,joke,journey,joy,judge,juice,jump,jungle,junior,junk,just,' +
  'kangaroo,keen,keep,ketchup,key,kick,kid,kidney,kind,kingdom,kiss,kit,' +
  'kitchen,kite,kitten,kiwi,knee,knife,knock,know,lab,label,labor,ladder,' +
  'lady,lake,lamp,language,laptop,large,later,latin,laugh,laundry,lava,law,' +
  'lawn,lawsuit,layer,lazy,leader,leaf,learn,leave,lecture,left,leg,legal,' +
  'legend,leisure,lemon,lend,length,lens,leopard,lesson,letter,level,liar,liberty,' +
  'library,license,life,lift,light,like,limb,limit,link,lion,liquid,list,' +
  'little,live,lizard,load,loan,lobster,local,lock,logic,lonely,long,loop,' +
  'lottery,loud,lounge,love,loyal,lucky,luggage,lumber,lunar,lunch,luxury,lyrics,' +
  'machine,mad,magic,magnet,maid,mail,main,major,make,mammal,man,manage,' +
  'mandate,mango,mansion,manual,maple,marble,march,margin,marine,market,marriage,mask,' +
  'mass,master,match,material,math,matrix,matter,maximum,maze,meadow,mean,measure,' +
  'meat,mechanic,medal,media,melody,melt,member,memory,mention,menu,mercy,merge,' +
  'merit,merry,mesh,message,metal,method,middle,midnight,milk,million,mimic,mind,' +
  'minimum,minor,minute,miracle,mirror,misery,miss,mistake,mix,mixed,mixture,mobile,' +
  'model,modify,mom,moment,monitor,monkey,monster,month,moon,moral,more,morning,' +
  'mosquito,mother,motion,motor,mountain,mouse,move,movie,much,muffin,mule,multiply,' +
  'muscle,museum,mushroom,music,must,mutual,myself,mystery,myth,naive,name,napkin,' +
  'narrow,nasty,nation,nature,near,neck,need,negative,neglect,neither,nephew,nerve,' +
  'nest,net,network,neutral,never,news,next,nice,night,noble,noise,nominee,' +
  'noodle,normal,north,nose,notable,note,nothing,notice,novel,now,nuclear,number,' +
  'nurse,nut,oak,obey,object,oblige,obscure,observe,obtain,obvious,occur,ocean,' +
  'october,odor,off,offer,office,often,oil,okay,old,olive,olympic,omit,' +
  'once,one,onion,online,only,open,opera,opinion,oppose,option,orange,orbit,' +
  'orchard,order,ordinary,organ,orient,original,orphan,ostrich,other,outdoor,outer,output,' +
  'outside,oval,oven,over,own,owner,oxygen,oyster,ozone,pact,paddle,page,' +
  'pair,palace,palm,panda,panel,panic,panther,paper,parade,parent,park,parrot,' +
  'party,pass,patch,path,patient,patrol,pattern,pause,pave,payment,peace,peanut,' +
  'pear,peasant,pelican,pen,penalty,pencil,people,pepper,perfect,permit,person,pet,' +
  'phone,photo,phrase,physical,piano,picnic,picture,piece,pig,pigeon,pill,pilot,' +
  'pink,pioneer,pipe,pistol,pitch,pizza,place,planet,plastic,plate,play,please,' +
  'pledge,pluck,plug,plunge,poem,poet,point,polar,pole,police,pond,pony,' +
  'pool,popular,portion,position,possible,post,potato,pottery,poverty,powder,power,practice,' +
  'praise,predict,prefer,prepare,present,pretty,prevent,price,pride,primary,print,priority,' +
  'prison,private,prize,problem,process,produce,profit,program,project,promote,proof,property,' +
  'prosper,protect,proud,provide,public,pudding,pull,pulp,pulse,pumpkin,punch,pupil,' +
  'puppy,purchase,purity,purpose,purse,push,put,puzzle,pyramid,quality,quantum,quarter,' +
  'question,quick,quit,quiz,quote,rabbit,raccoon,race,rack,radar,radio,rail,' +
  'rain,raise,rally,ramp,ranch,random,range,rapid,rare,rate,rather,raven,' +
  'raw,razor,ready,real,reason,rebel,rebuild,recall,receive,recipe,record,recycle,' +
  'reduce,reflect,reform,refuse,region,regret,regular,reject,relax,release,relief,rely,' +
  'remain,remember,remind,remove,render,renew,rent,reopen,repair,repeat,replace,report,' +
  'require,rescue,resemble,resist,resource,response,result,retire,retreat,return,reunion,reveal,' +
  'review,reward,rhythm,rib,ribbon,rice,rich,ride,ridge,rifle,right,rigid,' +
  'ring,riot,ripple,risk,ritual,rival,river,road,roast,robot,robust,rocket,' +
  'romance,roof,rookie,room,rose,rotate,rough,round,route,royal,rubber,rude,' +
  'rug,rule,run,runway,rural,sad,saddle,sadness,safe,sail,salad,salmon,' +
  'salon,salt,salute,same,sample,sand,satisfy,satoshi,sauce,sausage,save,say,' +
  'scale,scan,scare,scatter,scene,scheme,school,science,scissors,scorpion,scout,scrap,' +
  'screen,script,scrub,sea,search,season,seat,second,secret,section,security,seed,' +
  'seek,segment,select,sell,seminar,senior,sense,sentence,series,service,session,settle,' +
  'setup,seven,shadow,shaft,shallow,share,shed,shell,sheriff,shield,shift,shine,' +
  'ship,shiver,shock,shoe,shoot,shop,short,shoulder,shove,shrimp,shrug,shuffle,' +
  'shy,sibling,sick,side,siege,sight,sign,silent,silk,silly,silver,similar,' +
  'simple,since,sing,siren,sister,situate,six,size,skate,sketch,ski,skill,' +
  'skin,skirt,skull,slab,slam,sleep,slender,slice,slide,slight,slim,slogan,' +
  'slot,slow,slush,small,smart,smile,smoke,smooth,snack,snake,snap,sniff,' +
  'snow,soap,soccer,social,sock,soda,soft,solar,soldier,solid,solution,solve,' +
  'someone,song,soon,sorry,sort,soul,sound,soup,source,south,space,spare,' +
  'spatial,spawn,speak,special,speed,spell,spend,sphere,spice,spider,spike,spin,' +
  'spirit,split,spoil,sponsor,spoon,sport,spot,spray,spread,spring,spy,square,' +
  'squeeze,squirrel,stable,stadium,staff,stage,stairs,stamp,stand,start,state,stay,' +
  'steak,steel,stem,step,stereo,stick,still,sting,stock,stomach,stone,stool,' +
  'story,stove,strategy,street,strike,strong,struggle,student,stuff,stumble,style,subject,' +
  'submit,subway,success,such,sudden,suffer,sugar,suggest,suit,summer,sun,sunny,' +
  'sunset,super,supply,supreme,sure,surface,surge,surprise,surround,survey,suspect,sustain,' +
  'swallow,swamp,swap,swarm,swear,sweet,swift,swim,swing,switch,sword,symbol,' +
  'symptom,syrup,system,table,tackle,tag,tail,talent,talk,tank,tape,target,' +
  'task,taste,tattoo,taxi,teach,team,tell,ten,tenant,tennis,tent,term,' +
  'test,text,thank,that,theme,then,theory,there,they,thing,this,thought,' +
  'three,thrive,throw,thumb,thunder,ticket,tide,tiger,tilt,timber,time,tiny,' +
  'tip,tired,tissue,title,toast,tobacco,today,toddler,toe,together,toilet,token,' +
  'tomato,tomorrow,tone,tongue,tonight,tool,tooth,top,topic,topple,torch,tornado,' +
  'tortoise,toss,total,tourist,toward,tower,town,toy,track,trade,traffic,tragic,' +
  'train,transfer,trap,trash,travel,tray,treat,tree,trend,trial,tribe,trick,' +
  'trigger,trim,trip,trophy,trouble,truck,true,truly,trumpet,trust,truth,try,' +
  'tube,tuition,tumble,tuna,tunnel,turkey,turn,turtle,twelve,twenty,twice,twin,' +
  'twist,two,type,typical,ugly,umbrella,unable,unaware,uncle,uncover,under,undo,' +
  'unfair,unfold,unhappy,uniform,unique,unit,universe,unknown,unlock,until,unusual,unveil,' +
  'update,upgrade,uphold,upon,upper,upset,urban,urge,usage,use,used,useful,' +
  'useless,usual,utility,vacant,vacuum,vague,valid,valley,valve,van,vanish,vapor,' +
  'various,vast,vault,vehicle,velvet,vendor,venture,venue,verb,verify,version,very,' +
  'vessel,veteran,viable,vibrant,vicious,victory,video,view,village,vintage,violin,virtual,' +
  'virus,visa,visit,visual,vital,vivid,vocal,voice,void,volcano,volume,vote,' +
  'voyage,wage,wagon,wait,walk,wall,walnut,want,warfare,warm,warrior,wash,' +
  'wasp,waste,water,wave,way,wealth,weapon,wear,weasel,weather,web,wedding,' +
  'weekend,weird,welcome,west,wet,whale,what,wheat,wheel,when,where,whip,' +
  'whisper,wide,width,wife,wild,will,win,window,wine,wing,wink,winner,' +
  'winter,wire,wisdom,wise,wish,witness,wolf,woman,wonder,wood,wool,word,' +
  'work,world,worry,worth,wrap,wreck,wrestle,wrist,write,wrong,yard,year,' +
  'yellow,you,young,youth,zebra,zero,zone,zoo'
).split(',');

/* Byte helpers */

function concatBytes(...arrays) {
  const out = new Uint8Array(arrays.reduce((n, a) => n + a.length, 0));
  let at = 0;
  for (const a of arrays) { out.set(a, at); at += a.length; }
  return out;
}

function xorBytes(a, b) {
  return Uint8Array.from(a, (v, i) => v ^ b[i]);
}

function randomBytes(n) {
  return crypto.getRandomValues(new Uint8Array(n));
}

const utf8 = new TextEncoder();

/* WebCrypto wrappers */

async function sha256(data) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', data));
}

async function hmac(hash, key, data) {
  const k = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', k, data));
}

async function pbkdf2(hash, password, salt, iterations, dkLen) {
  const k = await crypto.subtle.importKey('raw', password, 'PBKDF2', false, ['deriveBits']);
  return new Uint8Array(await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash, salt, iterations }, k, dkLen * 8));
}

/* RIPEMD-160 — not in WebCrypto; exists only for the BIP-32 master fingerprint */

const RMD_ZL = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
const RMD_ZR = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
const RMD_SL = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
const RMD_SR = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
const RMD_KL = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e];
const RMD_KR = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000];

function rmdF(j, x, y, z) {
  if (j < 16) return x ^ y ^ z;
  if (j < 32) return (x & y) | (~x & z);
  if (j < 48) return (x | ~y) ^ z;
  if (j < 64) return (x & z) | (y & ~z);
  return x ^ (y | ~z);
}

function rol(x, n) { return (x << n) | (x >>> (32 - n)); }

function ripemd160(msg) {
  const len = msg.length;
  const padded = new Uint8Array(((len + 8) >> 6 << 6) + 64);
  padded.set(msg);
  padded[len] = 0x80;
  const dv = new DataView(padded.buffer);
  dv.setUint32(padded.length - 8, (len << 3) >>> 0, true);
  dv.setUint32(padded.length - 4, Math.floor(len / 0x20000000), true);

  const h = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
  const x = new Int32Array(16);

  for (let chunk = 0; chunk < padded.length; chunk += 64) {
    for (let i = 0; i < 16; i++) x[i] = dv.getInt32(chunk + i * 4, true);
    let al = h[0], bl = h[1], cl = h[2], dl = h[3], el = h[4];
    let ar = h[0], br = h[1], cr = h[2], dr = h[3], er = h[4], t;
    for (let j = 0; j < 80; j++) {
      t = rol((al + rmdF(j, bl, cl, dl) + x[RMD_ZL[j]] + RMD_KL[(j / 16) | 0]) | 0, RMD_SL[j]);
      t = (t + el) | 0;
      al = el; el = dl; dl = rol(cl, 10); cl = bl; bl = t;
      t = rol((ar + rmdF(79 - j, br, cr, dr) + x[RMD_ZR[j]] + RMD_KR[(j / 16) | 0]) | 0, RMD_SR[j]);
      t = (t + er) | 0;
      ar = er; er = dr; dr = rol(cr, 10); cr = br; br = t;
    }
    t = (h[1] + cl + dr) | 0;
    h[1] = (h[2] + dl + er) | 0;
    h[2] = (h[3] + el + ar) | 0;
    h[3] = (h[4] + al + br) | 0;
    h[4] = (h[0] + bl + cr) | 0;
    h[0] = t;
  }

  const out = new Uint8Array(20), ov = new DataView(out.buffer);
  for (let i = 0; i < 5; i++) ov.setUint32(i * 4, h[i] >>> 0, true);
  return out;
}

/* secp256k1 base-point multiply — not in WebCrypto; exists only for the BIP-32 master fingerprint */

const P256K = BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f');
const GX = BigInt('0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798');
const GY = BigInt('0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8');

function mod(a, m) { const r = a % m; return r < 0n ? r + m : r; }

function modInv(a, m) {
  let result = 1n, base = mod(a, m), e = m - 2n;
  while (e > 0n) {
    if (e & 1n) result = (result * base) % m;
    base = (base * base) % m;
    e >>= 1n;
  }
  return result;
}

function jacDouble(pt) {
  const [X, Y, Z] = pt;
  if (Y === 0n) return [0n, 0n, 0n];
  const A = (Y * Y) % P256K;
  const B = mod(4n * X * A, P256K);
  const C = mod(8n * A * A, P256K);
  const D = mod(3n * X * X, P256K);
  const X3 = mod(D * D - 2n * B, P256K);
  const Y3 = mod(D * (B - X3) - C, P256K);
  const Z3 = mod(2n * Y * Z, P256K);
  return [X3, Y3, Z3];
}

function jacAdd(p, q) {
  if (p[2] === 0n) return q;
  if (q[2] === 0n) return p;
  const Z12 = (p[2] * p[2]) % P256K, Z22 = (q[2] * q[2]) % P256K;
  const U1 = (p[0] * Z22) % P256K, U2 = (q[0] * Z12) % P256K;
  const S1 = mod(p[1] * Z22 * q[2], P256K), S2 = mod(q[1] * Z12 * p[2], P256K);
  if (U1 === U2) return S1 === S2 ? jacDouble(p) : [0n, 0n, 0n];
  const H = mod(U2 - U1, P256K), R = mod(S2 - S1, P256K);
  const H2 = (H * H) % P256K, H3 = (H2 * H) % P256K;
  const X3 = mod(R * R - H3 - 2n * U1 * H2, P256K);
  const Y3 = mod(R * (U1 * H2 - X3) - S1 * H3, P256K);
  const Z3 = mod(H * p[2] * q[2], P256K);
  return [X3, Y3, Z3];
}

function pubkeyCompressed(k) {
  let acc = [0n, 0n, 0n], add = [GX, GY, 1n];
  while (k > 0n) {
    if (k & 1n) acc = jacAdd(acc, add);
    add = jacDouble(add);
    k >>= 1n;
  }
  const zInv = modInv(acc[2], P256K), zInv2 = (zInv * zInv) % P256K;
  const x = (acc[0] * zInv2) % P256K;
  const y = mod(acc[1] * zInv2 % P256K * zInv, P256K);
  const out = new Uint8Array(33);
  out[0] = (y & 1n) ? 0x03 : 0x02;
  out.set(Uint8Array.fromHex(x.toString(16).padStart(64, '0')), 1);
  return out;
}

async function bip32Fingerprint(seed) {
  const I = await hmac('SHA-512', utf8.encode('Bitcoin seed'), seed);
  const h = await sha256(pubkeyCompressed(BigInt('0x' + I.subarray(0, 32).toHex())));
  return ripemd160(h).subarray(0, 4).toHex().toUpperCase();
}

/* GF(256) and Lagrange interpolation — the Shamir arithmetic */

const EXP = new Uint8Array(255), LOG = new Uint8Array(256);
{
  let poly = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = poly;
    LOG[poly] = i;
    poly = (poly << 1) ^ poly;
    if (poly & 0x100) poly ^= 0x11b;
    poly &= 0xff;
  }
}

function interpolate(shares, x) {
  const len = shares[0].y.length;
  for (const s of shares) {
    if (s.x === x) return new Uint8Array(s.y);
  }
  let logProd = 0;
  for (const s of shares) logProd += LOG[x ^ s.x];

  const out = new Uint8Array(len);
  for (const s of shares) {
    let sum = 0;
    for (const t of shares) sum += LOG[s.x ^ t.x];
    const basis = (((logProd - LOG[x ^ s.x] - sum) % 255) + 255) % 255;
    for (let k = 0; k < len; k++) {
      const y = s.y[k];
      if (y !== 0) out[k] ^= EXP[(LOG[y] + basis) % 255];
    }
  }
  return out;
}

/* RS1024 — the SLIP-39 mnemonic checksum */

const RS_GEN = [
  0xe0e040, 0x1c1c080, 0x3838100, 0x7070200, 0xe0e0009,
  0x1c0c2412, 0x38086c24, 0x3090fc48, 0x21b1f890, 0x3f3f120];

const CS_EXTENDABLE = 'shamir_extendable';
const CS_NON_EXTENDABLE = 'shamir';

function customizationValues(ext) {
  return Array.from(ext ? CS_EXTENDABLE : CS_NON_EXTENDABLE, c => c.charCodeAt(0));
}

function rs1024Polymod(values) {
  let chk = 1;
  for (const v of values) {
    const b = chk >> 20;
    chk = ((chk & 0xfffff) << 10) ^ v;
    for (let j = 0; j < 10; j++) if ((b >> j) & 1) chk ^= RS_GEN[j];
  }
  return chk;
}

function rs1024Checksum(data, ext) {
  const polymod = rs1024Polymod(customizationValues(ext).concat(data, [0, 0, 0])) ^ 1;
  return [(polymod >> 20) & 1023, (polymod >> 10) & 1023, polymod & 1023];
}

function rs1024Verify(data, ext) {
  return rs1024Polymod(customizationValues(ext).concat(data)) === 1;
}

/* SLIP-39 mnemonic encoding and decoding */

const METADATA_WORDS = 7;
const DIGEST_INDEX = 254;
const SECRET_INDEX = 255;
const DIGEST_BYTES = 4;
const BASE_ITERATIONS = 10000;
const ROUNDS = 4;

function pushBits(bits, value, count) {
  for (let i = count - 1; i >= 0; i--) bits.push((value >> i) & 1);
}

function encodeMnemonic(s) {
  const bits = [];
  pushBits(bits, s.id, 15);
  pushBits(bits, s.ext ? 1 : 0, 1);
  pushBits(bits, s.e, 4);
  pushBits(bits, s.groupIndex, 4);
  pushBits(bits, s.groupThreshold - 1, 4);
  pushBits(bits, s.groupCount - 1, 4);
  pushBits(bits, s.memberIndex, 4);
  pushBits(bits, s.memberThreshold - 1, 4);

  const valueBits = s.value.length * 8;
  const valueWords = Math.ceil(valueBits / 10);
  for (let i = 0; i < valueWords * 10 - valueBits; i++) bits.push(0);
  for (const b of s.value) pushBits(bits, b, 8);

  const idx = [];
  for (let i = 0; i < bits.length; i += 10) {
    let w = 0;
    for (let j = 0; j < 10; j++) w = (w << 1) | bits[i + j];
    idx.push(w);
  }
  return idx.concat(rs1024Checksum(idx, s.ext)).map(w => SLIP39_WORDS[w]).join(' ');
}

function decodeMnemonic(mnemonic) {
  const words = String(mnemonic).toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length < 20) throw new Error('A share must be at least 20 words.');

  const idx = words.map(w => {
    const i = SLIP39_WORDS.indexOf(w);
    if (i < 0) throw new Error(`"${w}" is not a SLIP-39 word.`);
    return i;
  });

  const ext = (idx[1] >> 4) & 1;
  if (!rs1024Verify(idx, ext)) {
    throw new Error('This share failed its checksum — check for a mistyped word.');
  }

  const bits = [];
  for (const v of idx) pushBits(bits, v, 10);
  let at = 0;
  const take = n => { let v = 0; for (let k = 0; k < n; k++) v = (v << 1) | bits[at++]; return v; };

  const out = {
    id: take(15),
    ext: take(1) === 1,
    e: take(4),
    groupIndex: take(4),
    groupThreshold: take(4) + 1,
    groupCount: take(4) + 1,
    memberIndex: take(4),
    memberThreshold: take(4) + 1
  };
  if (out.groupThreshold > out.groupCount) {
    throw new Error('Invalid share: group threshold exceeds group count.');
  }

  const valueWords = words.length - METADATA_WORDS;
  const padding = (valueWords * 10) % 16;
  if (padding > 8) throw new Error('Invalid share length.');
  for (let i = 0; i < padding; i++) {
    if (bits[at + i] !== 0) throw new Error('Invalid share: padding bits are not zero.');
  }
  at += padding;

  const valueBytes = (valueWords * 10 - padding) / 8;
  const value = new Uint8Array(valueBytes);
  for (let i = 0; i < valueBytes; i++) value[i] = take(8);
  out.value = value;
  return out;
}

/* SLIP-39 master-secret encryption — four-round Feistel over PBKDF2 */

function encryptionSalt(id, ext) {
  if (ext) return new Uint8Array(0);
  return concatBytes(utf8.encode(CS_NON_EXTENDABLE), new Uint8Array([id >> 8, id & 0xff]));
}

function roundFunction(i, passphrase, e, salt, r) {
  const password = concatBytes(new Uint8Array([i]), passphrase);
  const iterations = (BASE_ITERATIONS << e) / ROUNDS;
  return pbkdf2('SHA-256', password, concatBytes(salt, r), iterations, r.length);
}

async function feistel(data, passphrase, e, id, ext, forward) {
  const half = data.length / 2;
  let l = data.subarray(0, half), r = data.subarray(half);
  const salt = encryptionSalt(id, ext);
  for (let round = 0; round < ROUNDS; round++) {
    const i = forward ? round : ROUNDS - 1 - round;
    const f = await roundFunction(i, passphrase, e, salt, r);
    const next = xorBytes(l, f);
    l = r;
    r = next;
  }
  return concatBytes(r, l);
}

function encryptMasterSecret(secret, passphrase, e, id, ext) {
  return feistel(secret, passphrase, e, id, ext, true);
}

function decryptMasterSecret(ems, passphrase, e, id, ext) {
  return feistel(ems, passphrase, e, id, ext, false);
}

/* Shamir split and recover */

async function createDigest(randomPart, sharedSecret) {
  return (await hmac('SHA-256', randomPart, sharedSecret)).subarray(0, DIGEST_BYTES);
}

async function splitSecret(threshold, count, secret) {
  if (threshold < 1 || threshold > count || count > 16) {
    throw new Error('Invalid threshold or share count.');
  }
  if (threshold === 1) {
    return Array.from({ length: count }, (_, i) => ({ x: i, y: new Uint8Array(secret) }));
  }

  const randomCount = threshold - 2;
  const shares = Array.from({ length: randomCount },
    (_, j) => ({ x: j, y: randomBytes(secret.length) }));
  const randomPart = randomBytes(secret.length - DIGEST_BYTES);

  const digest = await createDigest(randomPart, secret);
  const base = shares.concat([
    { x: DIGEST_INDEX, y: concatBytes(digest, randomPart) },
    { x: SECRET_INDEX, y: secret }
  ]);
  for (let k = randomCount; k < count; k++) {
    shares.push({ x: k, y: interpolate(base, k) });
  }
  return shares;
}

async function recoverSecret(threshold, shares) {
  if (threshold === 1) return new Uint8Array(shares[0].y);
  const secret = interpolate(shares, SECRET_INDEX);
  const digestShare = interpolate(shares, DIGEST_INDEX);
  const expected = await createDigest(digestShare.subarray(DIGEST_BYTES), secret);
  if (expected.toHex() !== digestShare.subarray(0, DIGEST_BYTES).toHex()) {
    throw new Error('These shares do not belong together.');
  }
  return secret;
}

/* SLIP-39 public API — single group, threshold of count */

async function generateShares(secret, threshold, count, passphrase, e = 1) {
  if (secret.length < 16 || secret.length % 2 !== 0) {
    throw new Error('The secret must be at least 128 bits and a whole number of 16-bit units.');
  }
  const idBytes = randomBytes(2);
  const id = ((idBytes[0] << 8) | idBytes[1]) & 0x7fff;
  const pass = passphrase ? utf8.encode(passphrase) : new Uint8Array(0);

  const ems = await encryptMasterSecret(secret, pass, e, id, true);
  const shares = await splitSecret(threshold, count, ems);
  return shares.map(s => encodeMnemonic({
    id, ext: true, e,
    groupIndex: 0, groupThreshold: 1, groupCount: 1,
    memberIndex: s.x, memberThreshold: threshold, value: s.y
  }));
}

async function combineMnemonics(mnemonics, passphrase) {
  if (!mnemonics || !mnemonics.length) throw new Error('No shares given.');

  const decoded = mnemonics.map(decodeMnemonic);
  const first = decoded[0];
  for (const d of decoded.slice(1)) {
    if (d.id !== first.id || d.ext !== first.ext || d.e !== first.e ||
      d.groupThreshold !== first.groupThreshold || d.groupCount !== first.groupCount) {
      throw new Error('These shares come from different backups.');
    }
  }

  const groups = new Map();
  for (const d of decoded) {
    let g = groups.get(d.groupIndex);
    if (!g) groups.set(d.groupIndex, g = { threshold: d.memberThreshold, members: [] });
    if (g.threshold !== d.memberThreshold) {
      throw new Error('Inconsistent member thresholds within a group.');
    }
    if (g.members.some(m => m.x === d.memberIndex)) {
      throw new Error('The same share was supplied twice.');
    }
    g.members.push({ x: d.memberIndex, y: d.value });
  }

  const usable = [...groups.keys()]
    .filter(gi => groups.get(gi).members.length >= groups.get(gi).threshold);
  if (usable.length < first.groupThreshold) {
    throw new Error(`Not enough shares — need ${first.groupThreshold} group`
      + `${first.groupThreshold === 1 ? '' : 's'}.`);
  }
  const chosen = usable.slice(0, first.groupThreshold);

  for (const [gi, g] of groups) {
    if (g.members.length !== g.threshold && chosen.includes(gi)) {
      throw new Error(`Wrong number of shares for group ${gi}.`);
    }
  }

  const groupShares = await Promise.all(chosen.map(async gi => {
    const g = groups.get(gi);
    return { x: gi, y: await recoverSecret(g.threshold, g.members) };
  }));
  const ems = await recoverSecret(first.groupThreshold, groupShares);
  const pass = passphrase ? utf8.encode(passphrase) : new Uint8Array(0);
  return decryptMasterSecret(ems, pass, first.e, first.id, first.ext);
}

/* BIP-39 */

async function bip39ToEntropy(phrase) {
  const words = String(phrase).toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (![12, 15, 18, 21, 24].includes(words.length)) {
    throw new Error('A BIP-39 phrase must be 12, 15, 18, 21 or 24 words.');
  }
  const bits = [];
  for (const w of words) {
    const i = BIP39_WORDS.indexOf(w);
    if (i < 0) throw new Error(`"${w}" is not a BIP-39 word.`);
    pushBits(bits, i, 11);
  }
  const checkBits = bits.length / 33;
  const entBits = bits.length - checkBits;
  const entropy = new Uint8Array(entBits / 8);
  for (let i = 0; i < entropy.length; i++) {
    let v = 0;
    for (let j = 0; j < 8; j++) v = (v << 1) | bits[i * 8 + j];
    entropy[i] = v;
  }
  const h = await sha256(entropy);
  for (let k = 0; k < checkBits; k++) {
    if (((h[k >> 3] >> (7 - (k & 7))) & 1) !== bits[entBits + k]) {
      throw new Error('That phrase fails its BIP-39 checksum — check for a mistyped word.');
    }
  }
  return entropy;
}

async function bip39FromEntropy(entropy) {
  const h = await sha256(entropy);
  const bits = [];
  for (const b of entropy) pushBits(bits, b, 8);
  const checkBits = entropy.length * 8 / 32;
  for (let i = 0; i < checkBits; i++) bits.push((h[i >> 3] >> (7 - (i & 7))) & 1);
  const words = [];
  for (let i = 0; i < bits.length; i += 11) {
    let v = 0;
    for (let j = 0; j < 11; j++) v = (v << 1) | bits[i + j];
    words.push(BIP39_WORDS[v]);
  }
  return words.join(' ');
}

function bip39Seed(phrase, passphrase) {
  const norm = String(phrase).normalize('NFKD');
  const salt = ('mnemonic' + String(passphrase || '')).normalize('NFKD');
  return pbkdf2('SHA-512', utf8.encode(norm), utf8.encode(salt), 2048, 64);
}

/* WebAuthn largeBlob — the browser-only half of the file starts here */

const RECORD_VERSION = 1;

function toBlobRecord(o) {
  return {
    'version': RECORD_VERSION,
    'format': o.of,
    'domain': o.rp,
    'quorum-share': o.share,
    'quorum-size': o.n,
    'quorum-threshold': o.m,
    'quorum-index': o.i,
    'quorum-label': o.label,
    'bip32-fingerprint': o.fp,
    'passphrase-protected': !!o.hasPass,
    'created': o.created
  };
}

function fromBlobRecord(j) {
  if (!j || j.version !== RECORD_VERSION || !j['quorum-share']) return null;
  return {
    share: j['quorum-share'], of: j.format, rp: j.domain,
    n: j['quorum-size'], m: j['quorum-threshold'], i: j['quorum-index'],
    label: j['quorum-label'], fp: j['bip32-fingerprint'],
    hasPass: !!j['passphrase-protected'], created: j.created
  };
}

const KEYS_SETTINGS_URL = 'chrome://settings/securityKeys';
const HOSTED_URL = 'https://yubishard.com/';
const BLOB_BUDGET = 900;

function rpId() { return location.hostname; }

function challenge() { return crypto.getRandomValues(new Uint8Array(32)); }

let enrolledIds = [];
let pendingCred = null;

function settle(ms = 300) {
  return new Promise(r => setTimeout(r, ms));
}

function friendlyAuthError(e) {
  if (!e) return new Error('The key did not respond.');
  if (e.name === 'InvalidStateError') {
    return new Error('This key already holds a share from this backup. Use a different key, or '
      + 'free this one by deleting its credential.');
  }
  if (e.name === 'NotAllowedError') {
    return new Error('Cancelled, or the key was not touched in time. Try again.');
  }
  if (e.name === 'NotSupportedError') {
    return new Error('This browser or key cannot do what YubiShard needs. Use Chrome with a '
      + 'YubiKey on firmware 5.7 or newer.');
  }
  if (e.name === 'SecurityError') {
    return new Error('This page\'s address cannot be used with a security key. Open it as '
      + 'http://localhost:8000/ — not as a file, and not by IP address.');
  }
  return e;
}

async function writeShareToKey(record) {
  const bytes = utf8.encode(JSON.stringify(toBlobRecord(record)));
  if (bytes.length > BLOB_BUDGET) {
    throw new Error('That label is too long to fit alongside the share.');
  }
  if (pendingCred && pendingCred.i === record.i) {
    try {
      return await writeBlob(pendingCred.id, bytes);
    } catch (e) {
      throw friendlyAuthError(e);
    } finally {
      pendingCred = null;
    }
  }
  try {
    const cred = await navigator.credentials.create({
      publicKey: {
        challenge: challenge(),
        rp: { id: rpId(), name: 'YubiShard' },
        user: {
          id: crypto.getRandomValues(new Uint8Array(16)),
          name: `YubiShard: ${record.label} (share-${record.i + 1}-of-${record.n})`,
          displayName: record.label
        },
        pubKeyCredParams: [
          { type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'cross-platform',
          residentKey: 'required',
          userVerification: 'required'
        },
        excludeCredentials: enrolledIds.map(id => ({ type: 'public-key', id })),
        timeout: 120000,
        attestation: 'none',
        extensions: { largeBlob: { support: 'required' } }
      }
    });
    if (!cred) throw new Error('The key did not return a credential.');
    const ext = cred.getClientExtensionResults();
    if (!ext.largeBlob || ext.largeBlob.supported !== true) {
      throw new Error('This key cannot store a share. largeBlob needs YubiKey firmware 5.7 or '
        + 'newer — check yours with "ykman info".');
    }
    enrolledIds.push(cred.rawId);
    pendingCred = { i: record.i, id: cred.rawId };
    await settle();
    const ok = await writeBlob(cred.rawId, bytes);
    pendingCred = null;
    return ok;
  } catch (e) {
    throw friendlyAuthError(e);
  }
}

async function writeBlob(credId, bytes) {
  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge: challenge(),
      rpId: rpId(),
      allowCredentials: [{ type: 'public-key', id: credId }],
      userVerification: 'required',
      timeout: 120000,
      extensions: { largeBlob: { write: bytes } }
    }
  });
  const lb = assertion?.getClientExtensionResults()?.largeBlob;
  if (lb?.written === true) return true;
  throw Object.assign(new Error('The key did not store the share. The credential it left behind '
    + 'is unused.'), { notWritten: true });
}

async function readShareFromKey() {
  try {
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: challenge(),
        rpId: rpId(),
        allowCredentials: [],
        userVerification: 'required',
        timeout: 120000,
        extensions: { largeBlob: { read: true } }
      }
    });
    const ext = assertion?.getClientExtensionResults();
    if (!ext?.largeBlob?.blob) {
      throw new Error(`No YubiShard share on this key for ${rpId()}. If you enrolled it at `
        + 'the other address, open that one instead.');
    }
    let rec = null;
    try {
      rec = fromBlobRecord(
        JSON.parse(new TextDecoder().decode(new Uint8Array(ext.largeBlob.blob))));
    } catch { }
    if (!rec) {
      throw new Error('What is stored on this key is not a YubiShard share.');
    }
    return rec;
  } catch (e) {
    throw friendlyAuthError(e);
  }
}

/* Environment checks */

function localhostUrl() {
  return `${location.protocol}//localhost${location.port ? ':' + location.port : ''}`
    + location.pathname + location.search;
}

function isLoopbackHost(h) {
  return h === 'localhost' || /^127\./.test(h) || h === '[::1]' || h === '::1';
}

function runningLocally() {
  return location.protocol !== 'file:' && isLoopbackHost(location.hostname);
}

function envReport() {
  if (location.protocol === 'file:') {
    return {
      ok: false, html: '<b>This page needs a web address.</b> A security key identifies a '
        + 'site by its hostname, and a <code>file://</code> URL has none — so no key can be used '
        + 'here. Run <code>serve.command</code> (macOS) or <code>serve.bat</code> (Windows) from '
        + 'this folder and open <code>http://localhost:8000/</code>.'
    };
  }
  const host = location.hostname;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host) || host.includes(':')) {
    if (isLoopbackHost(host)) {
      return {
        ok: false,
        html: `Use <a href="${localhostUrl()}"><code>${localhostUrl()}</code></a>, not an IP address.`
      };
    }
    return {
      ok: false, html: '<b>Use a hostname, not an IP address.</b> A bare IP can never identify a '
        + 'site to a security key, and this page is served from another machine, so '
        + `<code>localhost</code> will not reach it. Open <a href="${HOSTED_URL}"><code>`
        + `${HOSTED_URL}</code></a>, or download YubiShard and run it on your own machine.`
    };
  }
  if (!window.isSecureContext || !window.PublicKeyCredential || !navigator.credentials) {
    return {
      ok: false, html: '<b>This browser cannot use security keys here.</b> YubiShard needs '
        + 'Chrome on macOS or Windows 11, opened over <code>http://localhost</code> or https.'
    };
  }
  const parts = [];
  if (!window.chrome) {
    parts.push('<b>This browser is probably not supported.</b> Storing a share on a key uses the '
      + 'largeBlob extension, which Firefox does not implement and does not plan to. Use Chrome.');
  }
  parts.push(`Keys enrolled here are tied to <b><code>${esc(host)}</code></b> and can only be `
    + 'read back at this same URL.');
  return { ok: true, html: parts.join(' ') };
}

/* State */

const state = {
  dark: false, view: 'home', step: 0,

  count: 12, words: Array(12).fill(''), inputPass: '',
  hasPass: null,
  secret: null, seedFp: '', seedErr: '',

  n: 5, m: 3, shares: [],

  written: [], keyLabel: '', busy: false, writeErr: '',
  urlCopied: false,

  vRecords: [], verifyMsg: '', verifyOk: null,

  rRecords: [], readErr: '',
  rSeed: '', rFp: '', rKind: '', rAlt: '', rHasPass: false,
  reveal: false, seedCopied: false,

  env: envReport()
};

function setState(patch) { Object.assign(state, patch); render(); }

function seedPhrase() {
  return state.words.map(w => w.trim().toLowerCase()).filter(Boolean).join(' ');
}

function allWordsIn() { return state.words.every(w => w.trim().length > 0); }

function isSlip39() { return state.count === 20; }

function standardLabel() {
  if (state.count === 20) return 'SLIP-39 · 128-bit master secret';
  return `BIP-39 · ${state.count === 12 ? '128' : '256'}-bit entropy`;
}

function originKind() {
  if (state.count === 20) return 'slip39-128';
  return state.count === 12 ? 'bip39-128' : 'bip39-256';
}

/* DOM helpers */

function $(sel, root) { return (root || document).querySelector(sel); }

function setText(el, s) { if (el && el.textContent !== s) el.textContent = s; }

function setVal(el, v) {
  if (el && el !== document.activeElement && el.value !== v) el.value = v;
}

function show(el, on) { if (el) el.hidden = !on; }

function setOn(el, on) {
  el.classList.toggle('is-on', on);
  el.setAttribute('aria-pressed', on ? 'true' : 'false');
}

function esc(t) {
  return String(t).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function syncList(container, tplId, count, update) {
  const tpl = document.getElementById(tplId);
  while (container.children.length > count) container.removeChild(container.lastElementChild);
  while (container.children.length < count) {
    container.appendChild(tpl.content.firstElementChild.cloneNode(true));
  }
  for (let i = 0; i < count; i++) {
    const el = container.children[i];
    el.dataset.i = String(i);
    update(el, i);
  }
}

/* ZIP bundle for the download strip — browsers have no native ZIP writer */

const BUNDLE_FILES = [
  { name: 'index.html', mode: 0o644 },
  { name: 'styles.css', mode: 0o644 },
  { name: 'app.js', mode: 0o644 },
  { name: 'serve.command', mode: 0o755 },
  { name: 'serve.bat', mode: 0o644 }
];

const CRC_TABLE = Uint32Array.from({ length: 256 }, (_, i) => {
  let c = i;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  return c >>> 0;
});

function crc32(bytes) {
  let c = 0xffffffff;
  for (const b of bytes) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

async function deflate(bytes) {
  if (typeof CompressionStream !== 'function') return { method: 0, data: bytes };
  try {
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
    return { method: 8, data: await new Response(stream).bytes() };
  } catch {
    return { method: 0, data: bytes };
  }
}

function dosTime(d) {
  return ((d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1)) & 0xffff;
}

function dosDate(d) {
  return (((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xffff;
}

function buildZip(entries) {
  const now = new Date(), time = dosTime(now), date = dosDate(now);
  const chunks = [], central = [];
  let offset = 0;

  for (const e of entries) {
    const name = utf8.encode(e.name);
    const local = new Uint8Array(30 + name.length);
    const dv = new DataView(local.buffer);
    dv.setUint32(0, 0x04034b50, true);
    dv.setUint16(4, 20, true);
    dv.setUint16(6, 0, true);
    dv.setUint16(8, e.method, true);
    dv.setUint16(10, time, true);
    dv.setUint16(12, date, true);
    dv.setUint32(14, e.crc, true);
    dv.setUint32(18, e.data.length, true);
    dv.setUint32(22, e.raw, true);
    dv.setUint16(26, name.length, true);
    local.set(name, 30);
    chunks.push(local, e.data);

    const cd = new Uint8Array(46 + name.length);
    const cv = new DataView(cd.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 0x031e, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(10, e.method, true);
    cv.setUint16(12, time, true);
    cv.setUint16(14, date, true);
    cv.setUint32(16, e.crc, true);
    cv.setUint32(20, e.data.length, true);
    cv.setUint32(24, e.raw, true);
    cv.setUint16(28, name.length, true);
    cv.setUint32(38, (e.mode & 0xffff) << 16, true);
    cv.setUint32(42, offset, true);
    cd.set(name, 46);
    central.push(cd);

    offset += local.length + e.data.length;
  }

  const cdSize = central.reduce((n, c) => n + c.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, entries.length, true);
  ev.setUint16(10, entries.length, true);
  ev.setUint32(12, cdSize, true);
  ev.setUint32(16, offset, true);

  return new Blob([...chunks, ...central, end], { type: 'application/zip' });
}

let bundleUrl = null, bundlePending = null;

function prepareBundle() {
  if (bundleUrl) return Promise.resolve(bundleUrl);
  if (bundlePending) return bundlePending;
  bundlePending = Promise.all(BUNDLE_FILES.map(async f => {
    const r = await fetch(f.name);
    if (!r.ok) throw new Error(`${f.name} — ${r.status}`);
    const bytes = await r.bytes();
    const z = await deflate(bytes);
    return {
      name: f.name, mode: f.mode, raw: bytes.length,
      crc: crc32(bytes), method: z.method, data: z.data
    };
  })).then(entries => {
    bundleUrl = URL.createObjectURL(buildZip(entries));
    const a = $('#dl-link');
    if (a) {
      a.href = bundleUrl;
      a.download = 'yubishard.zip';
      a.removeAttribute('data-act');
    }
    return bundleUrl;
  }).catch(e => {
    bundlePending = null;
    throw e;
  });
  return bundlePending;
}

function downloadBundle() {
  prepareBundle().then(url => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'yubishard.zip';
    a.click();
  }).catch(e => {
    window.alert('Could not build the download: ' + e.message);
  });
}

/* Clipboard */

function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.top = '-1000px';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  document.body.removeChild(ta);
  return ok;
}

async function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch { }
  }
  return legacyCopy(text);
}

/* Reading the entered phrase */

let seedToken = 0;

async function readEnteredSeed() {
  const phrase = seedPhrase();
  if (isSlip39()) {
    const secret = await combineMnemonics([phrase], state.inputPass);
    return { secret, seed: secret };
  }
  const entropy = await bip39ToEntropy(phrase);
  const seed = await bip39Seed(phrase, '');
  return { secret: entropy, seed };
}

async function verificationFingerprint(secret, of) {
  if (of === 'bip39-128' || of === 'bip39-256') {
    return bip32Fingerprint(await bip39Seed(await bip39FromEntropy(secret), ''));
  }
  return bip32Fingerprint(secret);
}

function refreshSeed() {
  const token = ++seedToken;
  if (!allWordsIn()) {
    if (state.secret || state.seedFp || state.seedErr) {
      setState({ secret: null, seedFp: '', seedErr: '' });
    }
    return;
  }
  readEnteredSeed().then(async r => {
    if (token !== seedToken) return;
    setState({ secret: r.secret, seedErr: '' });
    const f = await bip32Fingerprint(r.seed);
    if (token === seedToken) setState({ seedFp: f });
  }).catch(e => {
    if (token === seedToken) {
      setState({ secret: null, seedFp: '', seedErr: e.message });
    }
  });
}

/* Render */

function backupSteps() {
  return [
    {
      title: 'Recovery phrase', note: allWordsIn() ? `${state.count} words entered`
        : `Enter your ${state.count}-word phrase`
    },
    { title: 'Split settings', note: `${state.m} of ${state.n} keys` },
    { title: 'Write to keys', note: `${state.written.length} of ${state.n} written` },
    { title: 'Verify restore', note: 'Required — proves the keys work' },
    { title: 'Store them apart', note: 'Different places, then wipe' }
  ];
}

function restoreSteps() {
  return [
    {
      title: 'Read your keys', note: state.rRecords.length
        ? `${state.rRecords.length} of ${state.rRecords[0].m} read` : 'One key at a time'
    },
    { title: 'Read your phrase', note: 'Then close the tab' }
  ];
}

function showPanels() {
  const v = state.view, s = state.step;
  show($('#home'), v === 'home');
  show($('#flow'), v !== 'home');
  show($('#p-seed'), v === 'backup' && s === 0);
  show($('#p-split'), v === 'backup' && s === 1);
  show($('#p-encrypt'), v === 'backup' && s === 2);
  show($('#p-verify'), v === 'backup' && s === 3);
  show($('#p-done'), v === 'backup' && s === 4);
  show($('#p-collect'), v === 'restore' && s === 0);
  show($('#p-restored'), v === 'restore' && s === 1);
}

function renderStepper() {
  const steps = state.view === 'restore' ? restoreSteps() : backupSteps();
  setText($('#flow-kicker'), state.view === 'restore' ? 'Restore' : 'Backup');
  setText($('#flow-title'), state.view === 'restore' ? 'Rebuild your seed' : 'Split onto keys');
  syncList($('#stepper'), 'tpl-step', steps.length, (el, i) => {
    const done = i < state.step, active = i === state.step;
    el.classList.toggle('is-done', done);
    el.classList.toggle('is-active', active);
    setText($('.step-dot', el), done ? '✓' : String(i + 1));
    setText($('.step-title', el), steps[i].title);
    setText($('.step-note', el), steps[i].note);
  });
}

function renderSeed() {
  const filled = state.words.filter(w => w.trim()).length;
  setText($('#word-progress'), `${filled} / ${state.count} words`);
  setText($('#std-hint'), standardLabel());
  setOn($('#chip12'), state.count === 12);
  setOn($('#chip20'), state.count === 20);
  setOn($('#chip24'), state.count === 24);
  const grid = $('#wordgrid');
  grid.classList.toggle('cols-4', state.count === 24);
  syncList(grid, 'tpl-word', state.count, (el, i) => {
    setText($('.word-n', el), String(i + 1));
    setVal($('input', el), state.words[i] || '');
  });
  setVal($('#input-pass'), state.inputPass);
  show($('#decrypt-pass-wrap'), isSlip39() && state.hasPass === true);
  setOn($('#pass-no'), state.hasPass === false);
  setOn($('#pass-yes'), state.hasPass === true);
  $('#seed-next').disabled = !state.secret || state.hasPass === null;
  setText($('#seed-fp-label'), state.hasPass
    ? 'Wallet fingerprint before passphrase' : 'Wallet fingerprint');
  setText($('#seed-fp'), state.seedFp);
  show($('#seed-fp-wrap'), !!state.seedFp);
  show($('#seed-blocked'), allWordsIn() && state.hasPass === null);
  setText($('#seed-err'), state.seedErr);
  show($('#seed-err'), !!state.seedErr);
}

function renderSplit() {
  setText($('#n-val'), String(state.n));
  setText($('#m-val'), String(state.m));
  setVal($('#n-range'), String(state.n));
  $('#m-range').max = String(state.n);
  setVal($('#m-range'), String(state.m));
  syncList($('#viz'), 'tpl-viz', state.n, (el, i) => {
    el.classList.toggle('is-needed', i < state.m);
    setText($('span', el), '#' + (i + 1));
  });
  let sentence;
  if (state.n === 1) {
    sentence = 'One key holding one share. No splitting — this is a single copy of your seed, and '
      + 'losing that key loses it.';
  } else if (state.m === 1) {
    sentence = 'Any single key rebuilds your seed on its own — convenient, but one stolen key and '
      + 'its PIN is a stolen wallet.';
  } else {
    sentence = `Any ${state.m} of the ${state.n} keys rebuild your seed. Any `
      + `${state.m - 1} reveal nothing at all.`;
  }
  setText($('#split-sentence'), sentence);
  setText($('#split-note'), `You will need ${state.n} YubiKeys, one per share. A key cannot `
    + `be cloned, so losing more than ${state.n - state.m} of them loses the backup. Have `
    + 'them all to hand before you start.');
  setText($('#split-next'), state.busy ? 'Splitting…' : `Split into ${state.n} shares`);
  $('#split-next').disabled = state.busy;
}

function renderWrite() {
  setText($('#pin-note'), 'Chrome will ask you to set a PIN if the key has none, and 0000 is '
    + 'accepted. The PIN is the only thing protecting a share on a key you lose, so a known '
    + `default means anyone holding ${state.m} of these keys has your seed. Whichever you `
    + 'pick, write it down: eight wrong attempts wipes a key, and a PIN forgotten across every '
    + 'key cannot be recovered.');
  syncList($('#enc-rows'), 'tpl-enc-row', state.n, (el, i) => {
    const done = state.written[i];
    const active = !done && i === state.written.length;
    const resuming = active && !!(pendingCred && pendingCred.i === i);
    el.classList.toggle('is-active', active);
    el.classList.toggle('is-done', !!done);
    setText($('.row-dot', el), done ? '✓' : String(i + 1));
    setText($('.row-title', el), `Share ${i + 1} of ${state.n}`);
    setText($('.row-sub', el), done ? done.label
      : active ? 'Plug in the key for this share' : 'Waiting');
    const status = $('.status', el);
    setText(status, done ? 'On the key' : active ? 'Your turn' : 'Not started');
    status.className = 'status ' + (done ? 'ok' : active ? 'active' : 'idle');
    show($('.row-body', el), active);
    show($('.row-done', el), !!done);
    if (active) {
      const failed = !!state.writeErr;
      setVal($('.f-label', el), state.keyLabel);
      $('.f-label', el).disabled = resuming;
      $('.f-write', el).disabled = state.busy;
      show($('.f-addr', el), failed && !state.busy);
      setText($('.f-addr-url', el), KEYS_SETTINGS_URL);
      setText($('.f-addr-done', el), state.urlCopied ? 'Copied' : '');
      setText($('.f-addr-lead', el), failed ? 'Check your key at' : '');
      show($('.spinner', el), state.busy);
      setText($('.btn-label', el), state.busy ? 'Follow the prompts…'
        : resuming ? 'Try storing the share again' : 'Write the share to this key');
      setText($('.f-hint', el), state.busy ? 'PIN and touch'
        : failed ? ''
          : resuming ? 'This key is already set up — this press only stores the share on it'
            : `Share ${i + 1} of ${state.n}`);
      setText($('.f-err', el), state.writeErr);
    }
    if (done) {
      setText($('.f-stored', el), 'Stored on the key.');
    }
  });
  show($('#to-verify-wrap'), state.written.length === state.n);
}

function renderReadButton(btn, left) {
  setText($('.btn-label', btn), state.busy ? 'Follow the prompts…'
    : 'Read a YubiKey' + (left > 0 ? ` (${left} to go)` : ''));
  show($('.spinner', btn), state.busy);
  btn.disabled = state.busy;
}

function renderVerify() {
  setText($('#verify-sub'), 'Unplug each key, plug it back in, and read the share off it. This '
    + `proves the write worked while you can still redo it. ${state.m} of the ${state.n} `
    + 'keys are needed.');
  syncList($('#verify-rows'), 'tpl-read-row', state.vRecords.length, (el, i) => {
    const r = state.vRecords[i];
    setText($('.row-title', el), `Share ${r.i + 1} of ${r.n}`);
    setText($('.row-sub', el), r.label);
  });
  renderReadButton($('#verify-btn'), state.m - state.vRecords.length);
  const msg = $('#verify-msg');
  setText(msg, state.verifyMsg);
  msg.className = 'result ' + (state.verifyOk ? 'ok' : 'err');
}

function renderDone() {
  setText($('#done-badge'), `Verified — ${state.m} keys rebuilt your seed`);
  setText($('#done-fp-label'), state.hasPass
    ? 'Wallet fingerprint before passphrase' : 'Wallet fingerprint');
  setText($('#done-fp'), state.seedFp);
  syncList($('#done-grid'), 'tpl-done-card', state.written.length, (el, i) => {
    setText($('.done-num', el), '#' + (i + 1));
    setText($('.done-label', el), state.written[i].label);
    setText($('.done-blob', el), `Share ${i + 1} of ${state.n} — on the key.`);
  });
}

function renderCollect() {
  syncList($('#collect-rows'), 'tpl-read-row', state.rRecords.length, (el, i) => {
    const r = state.rRecords[i];
    setText($('.row-title', el), `Share ${r.i + 1} of ${r.n}`);
    setText($('.row-sub', el), r.label);
  });
  const need = state.rRecords.length ? state.rRecords[0].m : null;
  renderReadButton($('#read-btn'), need === null ? 0 : need - state.rRecords.length);
  setText($('#collect-hint'), need === null ? ''
    : `This backup needs ${need} of ${state.rRecords[0].n} keys.`);
  setText($('#read-err'), state.readErr);
  show($('#read-err'), !!state.readErr);
}

function renderRestored() {
  const words = state.rSeed ? state.rSeed.split(' ') : [];
  setText($('#restored-kind'), state.rKind);
  setText($('#restored-passphrase'), state.rHasPass
    ? 'has passphrase' : 'no passphrase');
  setText($('#restored-fp-label'), state.rHasPass
    ? 'wallet fingerprint before passphrase' : 'wallet fingerprint');
  setText($('#restored-fp'), state.rFp);
  const grid = $('#words-out');
  grid.classList.toggle('cols-4', words.length > 12);
  grid.classList.toggle('is-hidden', !state.reveal);
  syncList(grid, 'tpl-word-out', words.length, (el, i) => {
    setText($('.word-n', el), String(i + 1));
    setText($('.value', el), words[i]);
  });
  setText($('#reveal-btn'), state.reveal ? 'Hide phrase' : 'Reveal phrase');
  setText($('#copy-seed-btn'), state.seedCopied ? 'Copied' : 'Copy phrase');
  setText($('#restored-alt'), state.rAlt);
  show($('#restored-alt'), !!state.rAlt);
  setText($('#restored-pass'), state.rHasPass
    ? 'This wallet uses a passphrase. These words alone will not open it — the passphrase was '
    + 'never stored in this backup and cannot be recovered from the keys. Enter it in your '
    + 'wallet as well. The fingerprint above is the wallet without it, so expect your wallet '
    + 'to show a different one.'
    : '');
  show($('#restored-pass'), !!state.rHasPass);
}

function renderEnv() {
  $('#env-banner').innerHTML = state.env.html;
  const offsite = !runningLocally();
  show($('#dl-banner'), offsite);
  if (offsite) prepareBundle().catch(() => { });
}

function render() {
  document.documentElement.toggleAttribute('data-dark', state.dark);
  setText($('#theme-btn'), state.dark ? 'Light' : 'Dark');
  renderEnv();
  showPanels();
  if (state.view === 'home') return;
  renderStepper();
  if (state.view === 'backup') {
    if (state.step === 0) renderSeed();
    if (state.step === 1) renderSplit();
    if (state.step === 2) renderWrite();
    if (state.step === 3) renderVerify();
    if (state.step === 4) renderDone();
  } else {
    if (state.step === 0) renderCollect();
    if (state.step === 1) renderRestored();
  }
}

/* Actions */

const DEMO = {
  12: 'legal winner thank year wave sausage worth useful legal winner thank yellow',
  24: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon '
    + 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon '
    + 'abandon art',
  20: 'duckling enlarge academic academic agency result length solution fridge kidney coal piece '
    + 'deal husband erode duke ajar critical decision keyboard'
};

function setCount(n) {
  setState({
    count: n, words: Array(n).fill(''), inputPass: '',
    secret: null, seedFp: '', seedErr: ''
  });
}

async function doSplit() {
  if (state.busy || !state.secret) return;
  setState({ busy: true, writeErr: '' });
  try {
    const shares = await generateShares(state.secret, state.m, state.n, '');
    setState({ shares, written: [], busy: false, step: 2, keyLabel: '' });
  } catch (e) {
    setState({ busy: false, seedErr: e.message });
  }
}

async function doWrite() {
  if (state.busy) return;
  const i = state.written.length;
  if (i >= state.n) return;
  const label = state.keyLabel.trim() || `YubiKey ${i + 1}`;
  setState({ busy: true, writeErr: '' });
  try {
    await writeShareToKey({
      share: state.shares[i], of: originKind(), rp: rpId(),
      n: state.n, m: state.m, i, label,
      fp: state.seedFp, hasPass: !!state.hasPass,
      created: new Date().toISOString().slice(0, 10)
    });
    setState({ written: [...state.written, { label }], busy: false, keyLabel: '' });
  } catch (e) {
    setState({ busy: false, writeErr: e.message });
  }
}

async function doVerifyRead() {
  if (state.busy) return;
  setState({ busy: true, verifyMsg: '', verifyOk: null });
  try {
    const rec = await readShareFromKey();
    if (state.vRecords.some(r => r.i === rec.i)) {
      throw new Error('That key has already been read — try a different one.');
    }
    const recs = [...state.vRecords, rec];
    if (recs.length < state.m) {
      setState({ vRecords: recs, busy: false });
      return;
    }
    const secret = await combineMnemonics(recs.map(r => r.share), '');
    if (secret.toHex() !== state.secret.toHex()) {
      throw new Error('Those keys rebuild a different secret. Do not rely on this backup.');
    }
    setState({
      vRecords: recs, busy: false, verifyOk: true, step: 4,
      verifyMsg: 'Verified — moving on'
    });
  } catch (e) {
    setState({ busy: false, verifyOk: false, verifyMsg: e.message });
  }
}

async function presentSecret(secret, of, recordedFp) {
  if (of === 'bip39-128' || of === 'bip39-256') {
    const phrase = await bip39FromEntropy(secret);
    return {
      text: phrase, kind: `BIP-39 · ${phrase.split(' ').length} words`,
      fp: recordedFp, alt: ''
    };
  }
  const [one] = await generateShares(secret, 1, 1, '');
  const out = {
    text: one, kind: `SLIP-39 · ${one.split(' ').length} words`,
    fp: recordedFp, alt: ''
  };
  if (of) return out;
  try {
    const phrase = await bip39FromEntropy(secret);
    out.kind = `SLIP-39 · ${one.split(' ').length} words (origin not recorded)`;
    out.alt = `If this backup was made from a BIP-39 phrase, the same bytes are: ${phrase}`;
  } catch { }
  return out;
}

async function finishRestore(mnemonics, of, recordedFp, hasPass) {
  const recovered = await combineMnemonics(mnemonics, '');
  let checked = false;
  if (recordedFp) {
    const f = await verificationFingerprint(recovered, of);
    if (f !== recordedFp) {
      throw new Error('These shares rebuild a different wallet than the one that was backed '
        + `up — got ${f}, the keys record ${recordedFp}. Do not use this result.`);
    }
    checked = true;
  }
  const r = await presentSecret(recovered, of, recordedFp);
  if (checked) r.kind += ' · fingerprint verified';
  if (!r.fp) r.fp = await verificationFingerprint(recovered, of);
  setState({
    rSeed: r.text, rKind: r.kind, rFp: r.fp, rAlt: r.alt, rHasPass: !!hasPass,
    busy: false, step: 1, reveal: false, readErr: ''
  });
}

async function doRestoreRead() {
  if (state.busy) return;
  setState({ busy: true, readErr: '' });
  try {
    const rec = await readShareFromKey();
    if (state.rRecords.some(r => r.i === rec.i)) {
      throw new Error('That key has already been read — try a different one.');
    }
    const first = state.rRecords[0];
    if (first && (rec.fp !== first.fp || rec.n !== first.n || rec.m !== first.m)) {
      throw new Error(`That key belongs to a different backup (${rec.fp}, not ${first.fp}).`);
    }
    const recs = [...state.rRecords, rec];
    if (recs.length < recs[0].m) {
      setState({ rRecords: recs, busy: false });
      return;
    }
    setState({ rRecords: recs });
    await finishRestore(recs.map(r => r.share), recs[0].of, recs[0].fp, recs[0].hasPass);
  } catch (e) {
    setState({ busy: false, readErr: e.message });
  }
}

function wipe() {
  enrolledIds = [];
  pendingCred = null;
  setState({
    view: 'home', step: 0, count: 12, words: Array(12).fill(''), inputPass: '',
    secret: null, seedFp: '', seedErr: '', hasPass: null, n: 5, m: 3, shares: [],
    written: [], keyLabel: '', busy: false, writeErr: '',
    urlCopied: false,
    vRecords: [], verifyMsg: '', verifyOk: null,
    rRecords: [], readErr: '',
    rSeed: '', rFp: '', rKind: '', rAlt: '', rHasPass: false,
    reveal: false, seedCopied: false
  });
}

const CLICKS = {
  home: () => setState({ view: 'home' }),
  'download-bundle': downloadBundle,
  theme: () => setState({ dark: !state.dark }),
  backup: () => setState({ view: 'backup', step: 0 }),
  restore: () => setState({ view: 'restore', step: 0 }),
  back: () => setState({ step: Math.max(0, state.step - 1) }),
  count12: () => setCount(12),
  count20: () => setCount(20),
  count24: () => setCount(24),
  'pass-no': () => {
    setState({ hasPass: false, inputPass: '' });
    refreshSeed();
  },
  'pass-yes': () => setState({ hasPass: true }),
  demo: () => {
    setState({ words: DEMO[state.count].split(' '), hasPass: false });
    refreshSeed();
  },
  'seed-next': () => {
    if (state.secret && state.hasPass !== null) setState({ step: 1 });
  },
  'split-next': doSplit,
  'copy-keys-url': async () => {
    const ok = await copyText(KEYS_SETTINGS_URL);
    setState({ urlCopied: ok });
    setTimeout(() => setState({ urlCopied: false }), 1600);
  },
  'write-key': doWrite,
  'to-verify': () => setState({ step: 3, vRecords: [], verifyMsg: '', verifyOk: null }),
  'verify-read': doVerifyRead,
  'read-key': doRestoreRead,
  wipe,
  reveal: () => setState({ reveal: !state.reveal }),
  'copy-seed': async () => {
    const ok = await copyText(state.rSeed);
    setState({ seedCopied: ok });
    setTimeout(() => setState({ seedCopied: false }), 1400);
  }
};

const INPUTS = {
  word: (i, v) => {
    const w = [...state.words];
    w[i] = v;
    setState({ words: w });
    refreshSeed();
  },
  inputpass: (i, v) => { setState({ inputPass: v }); refreshSeed(); },
  n: (i, v) => {
    const n = +v;
    setState({ n, m: Math.min(state.m, n) });
  },
  m: (i, v) => setState({ m: Math.min(+v, state.n) }),
  keylabel: (i, v) => setState({ keyLabel: v })
};

/* Event wiring */

function indexOf(el) {
  const row = el.closest('[data-i]');
  return row ? +row.dataset.i : -1;
}

document.addEventListener('click', e => {
  const t = e.target.closest('[data-act]');
  if (!t || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
  const fn = CLICKS[t.dataset.act];
  if (!fn) return;
  if (t.tagName === 'A') e.preventDefault();
  fn(indexOf(t));
});

document.addEventListener('input', e => {
  const t = e.target.closest('[data-act]');
  if (!t) return;
  const fn = INPUTS[t.dataset.act];
  if (fn) fn(indexOf(t), t.value);
});

document.addEventListener('paste', e => {
  const t = e.target.closest('[data-act="word"]');
  if (!t) return;
  const text = e.clipboardData.getData('text') || '';
  const parts = text.trim().toLowerCase().split(/[\s,]+/).filter(Boolean);
  if (parts.length < 2) return;
  e.preventDefault();
  const count = [12, 20, 24].includes(parts.length) ? parts.length : state.count;
  const w = Array(count).fill('');
  parts.slice(0, count).forEach((p, k) => { w[k] = p; });
  t.blur();
  setState({ count, words: w });
  refreshSeed();
});

render();
