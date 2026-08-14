'use strict';

/* SLIP-39 wordlist (1024) and BIP-39 English wordlist (2048). */
var SLIP39_WORDS = (
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

var BIP39_WORDS = (
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

/* ============================================================
   Byte helpers
   ============================================================ */

function bytesToHex(b) {
  var s = '', i;
  for (i = 0; i < b.length; i++) s += (b[i] < 16 ? '0' : '') + b[i].toString(16);
  return s;
}

function hexToBytes(h) {
  var out = new Uint8Array(h.length / 2), i;
  for (i = 0; i < out.length; i++) out[i] = parseInt(h.substr(i * 2, 2), 16);
  return out;
}

function concatBytes() {
  var total = 0, i;
  for (i = 0; i < arguments.length; i++) total += arguments[i].length;
  var out = new Uint8Array(total), at = 0;
  for (i = 0; i < arguments.length; i++) { out.set(arguments[i], at); at += arguments[i].length; }
  return out;
}

function xorBytes(a, b) {
  var out = new Uint8Array(a.length), i;
  for (i = 0; i < a.length; i++) out[i] = a[i] ^ b[i];
  return out;
}

function randomBytes(n) {
  return crypto.getRandomValues(new Uint8Array(n));
}

var utf8 = new TextEncoder();

/* ============================================================
   WebCrypto wrappers

   WebAuthn forces this tool onto localhost or https, both of which are
   secure contexts, so crypto.subtle is always available. Only RIPEMD-160
   and secp256k1 have to be written by hand — WebCrypto has neither.
   ============================================================ */

function subtle() { return crypto.subtle; }

function sha256(data) {
  return subtle().digest('SHA-256', data).then(function (b) { return new Uint8Array(b); });
}

function hmac(hash, key, data) {
  // An empty HMAC key is legal in the abstract but rejected by importKey, and
  // it never arises here: SLIP-39 digests key on >= 12 random bytes.
  return subtle().importKey('raw', key, { name: 'HMAC', hash: hash }, false, ['sign'])
    .then(function (k) { return subtle().sign('HMAC', k, data); })
    .then(function (b) { return new Uint8Array(b); });
}

function pbkdf2(hash, password, salt, iterations, dkLen) {
  return subtle().importKey('raw', password, 'PBKDF2', false, ['deriveBits'])
    .then(function (k) {
      return subtle().deriveBits(
        { name: 'PBKDF2', hash: hash, salt: salt, iterations: iterations }, k, dkLen * 8);
    })
    .then(function (b) { return new Uint8Array(b); });
}

/* ============================================================
   RIPEMD-160

   Needed only for the BIP-32 fingerprint, which is HASH160 of the
   master public key. WebCrypto does not implement it.
   ============================================================ */

var RMD_ZL = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
var RMD_ZR = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
var RMD_SL = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
var RMD_SR = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
var RMD_KL = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e];
var RMD_KR = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000];

function rmdF(j, x, y, z) {
  if (j < 16) return x ^ y ^ z;
  if (j < 32) return (x & y) | (~x & z);
  if (j < 48) return (x | ~y) ^ z;
  if (j < 64) return (x & z) | (y & ~z);
  return x ^ (y | ~z);
}

function rol(x, n) { return (x << n) | (x >>> (32 - n)); }

function ripemd160(msg) {
  var len = msg.length;
  var padded = new Uint8Array(((len + 8) >> 6 << 6) + 64);
  padded.set(msg);
  padded[len] = 0x80;
  var bitLenLo = (len << 3) >>> 0, bitLenHi = Math.floor(len / 0x20000000);
  var dv = new DataView(padded.buffer);
  dv.setUint32(padded.length - 8, bitLenLo, true);
  dv.setUint32(padded.length - 4, bitLenHi, true);

  var h = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
  var x = new Int32Array(16), i, j, chunk;

  for (chunk = 0; chunk < padded.length; chunk += 64) {
    for (i = 0; i < 16; i++) x[i] = dv.getInt32(chunk + i * 4, true);
    var al = h[0], bl = h[1], cl = h[2], dl = h[3], el = h[4];
    var ar = h[0], br = h[1], cr = h[2], dr = h[3], er = h[4], t;
    for (j = 0; j < 80; j++) {
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

  var out = new Uint8Array(20), ov = new DataView(out.buffer);
  for (i = 0; i < 5; i++) ov.setUint32(i * 4, h[i] >>> 0, true);
  return out;
}

/* ============================================================
   secp256k1 — base point multiplication only

   Jacobian coordinates so the whole scalar multiply costs one modular
   inverse at the end rather than one per bit.
   ============================================================ */

var P256K = BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f');
var GX = BigInt('0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798');
var GY = BigInt('0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8');

function mod(a, m) { var r = a % m; return r < 0n ? r + m : r; }

function modInv(a, m) {
  // Fermat: m is prime, so a^(m-2) is the inverse.
  var result = 1n, base = mod(a, m), e = m - 2n;
  while (e > 0n) {
    if (e & 1n) result = (result * base) % m;
    base = (base * base) % m;
    e >>= 1n;
  }
  return result;
}

function jacDouble(pt) {
  var X = pt[0], Y = pt[1], Z = pt[2];
  if (Y === 0n) return [0n, 0n, 0n];
  var A = (Y * Y) % P256K;
  var B = mod(4n * X * A, P256K);
  var C = mod(8n * A * A, P256K);
  var D = mod(3n * X * X, P256K);
  var X3 = mod(D * D - 2n * B, P256K);
  var Y3 = mod(D * (B - X3) - C, P256K);
  var Z3 = mod(2n * Y * Z, P256K);
  return [X3, Y3, Z3];
}

function jacAdd(p, q) {
  if (p[2] === 0n) return q;
  if (q[2] === 0n) return p;
  var Z12 = (p[2] * p[2]) % P256K, Z22 = (q[2] * q[2]) % P256K;
  var U1 = (p[0] * Z22) % P256K, U2 = (q[0] * Z12) % P256K;
  var S1 = mod(p[1] * Z22 * q[2], P256K), S2 = mod(q[1] * Z12 * p[2], P256K);
  if (U1 === U2) return S1 === S2 ? jacDouble(p) : [0n, 0n, 0n];
  var H = mod(U2 - U1, P256K), R = mod(S2 - S1, P256K);
  var H2 = (H * H) % P256K, H3 = (H2 * H) % P256K;
  var X3 = mod(R * R - H3 - 2n * U1 * H2, P256K);
  var Y3 = mod(R * (U1 * H2 - X3) - S1 * H3, P256K);
  var Z3 = mod(H * p[2] * q[2], P256K);
  return [X3, Y3, Z3];
}

// Compressed SEC encoding of k*G.
function pubkeyCompressed(k) {
  var acc = [0n, 0n, 0n], add = [GX, GY, 1n];
  while (k > 0n) {
    if (k & 1n) acc = jacAdd(acc, add);
    add = jacDouble(add);
    k >>= 1n;
  }
  var zInv = modInv(acc[2], P256K), zInv2 = (zInv * zInv) % P256K;
  var x = (acc[0] * zInv2) % P256K;
  var y = mod(acc[1] * zInv2 % P256K * zInv, P256K);
  var out = new Uint8Array(33);
  out[0] = (y & 1n) ? 0x03 : 0x02;
  var hex = x.toString(16).padStart(64, '0');
  out.set(hexToBytes(hex), 1);
  return out;
}

/* Master fingerprint: first 4 bytes of HASH160 of the master public key.
   This is what lets a user tell, at a glance, whether a restore produced
   the wallet they backed up. */
function bip32Fingerprint(seed) {
  return hmac('SHA-512', utf8.encode('Bitcoin seed'), seed).then(function (I) {
    var k = BigInt('0x' + bytesToHex(I.subarray(0, 32)));
    return sha256(pubkeyCompressed(k));
  }).then(function (h) {
    return bytesToHex(ripemd160(h).subarray(0, 4)).toUpperCase();
  });
}

/* ============================================================
   GF(256)

   The field is generated by 3 (multiply by x+1), reduced by
   x^8 + x^4 + x^3 + x + 1, matching SLIP-39.
   ============================================================ */

var EXP = new Uint8Array(255), LOG = new Uint8Array(256);

(function () {
  var poly = 1;
  for (var i = 0; i < 255; i++) {
    EXP[i] = poly;
    LOG[poly] = i;
    poly = (poly << 1) ^ poly;
    if (poly & 0x100) poly ^= 0x11b;
    poly &= 0xff;
  }
})();

/* Lagrange interpolation of the shares at an arbitrary x. SLIP-39 needs
   x = 255 for the secret and x = 254 for the digest, not just x = 0. */
function interpolate(shares, x) {
  var len = shares[0].y.length, i, j, k;
  for (i = 0; i < shares.length; i++) {
    if (shares[i].x === x) return new Uint8Array(shares[i].y);
  }
  var logProd = 0;
  for (i = 0; i < shares.length; i++) logProd += LOG[x ^ shares[i].x];

  var out = new Uint8Array(len);
  for (i = 0; i < shares.length; i++) {
    var sum = 0;
    for (j = 0; j < shares.length; j++) sum += LOG[shares[i].x ^ shares[j].x];
    // JS % keeps the sign of the dividend, so normalise into [0, 255).
    var basis = (((logProd - LOG[x ^ shares[i].x] - sum) % 255) + 255) % 255;
    for (k = 0; k < len; k++) {
      var y = shares[i].y[k];
      if (y !== 0) out[k] ^= EXP[(LOG[y] + basis) % 255];
    }
  }
  return out;
}

/* ============================================================
   RS1024 checksum
   ============================================================ */

var RS_GEN = [
  0xe0e040, 0x1c1c080, 0x3838100, 0x7070200, 0xe0e0009,
  0x1c0c2412, 0x38086c24, 0x3090fc48, 0x21b1f890, 0x3f3f120];

var CS_EXTENDABLE = 'shamir_extendable';
var CS_NON_EXTENDABLE = 'shamir';

function customizationValues(ext) {
  var s = ext ? CS_EXTENDABLE : CS_NON_EXTENDABLE, out = [], i;
  for (i = 0; i < s.length; i++) out.push(s.charCodeAt(i));
  return out;
}

function rs1024Polymod(values) {
  var chk = 1, i, j;
  for (i = 0; i < values.length; i++) {
    var b = chk >> 20;
    chk = ((chk & 0xfffff) << 10) ^ values[i];
    for (j = 0; j < 10; j++) if ((b >> j) & 1) chk ^= RS_GEN[j];
  }
  return chk;
}

function rs1024Checksum(data, ext) {
  var values = customizationValues(ext).concat(data, [0, 0, 0]);
  var polymod = rs1024Polymod(values) ^ 1;
  return [(polymod >> 20) & 1023, (polymod >> 10) & 1023, polymod & 1023];
}

function rs1024Verify(data, ext) {
  return rs1024Polymod(customizationValues(ext).concat(data)) === 1;
}

/* ============================================================
   SLIP-39 mnemonic encoding

   Bit layout: id 15 | ext 1 | e 4 | group index 4 | group threshold 4
   | group count 4 | member index 4 | member threshold 4, then the share
   value left-padded to a multiple of 10 bits, then 3 checksum words.
   Thresholds and counts are stored one less than their value.
   ============================================================ */

var METADATA_WORDS = 7;   // 4 words of header + 3 of checksum
var DIGEST_INDEX = 254;
var SECRET_INDEX = 255;
var DIGEST_BYTES = 4;
var BASE_ITERATIONS = 10000;
var ROUNDS = 4;

function pushBits(bits, value, count) {
  for (var i = count - 1; i >= 0; i--) bits.push((value >> i) & 1);
}

function encodeMnemonic(s) {
  var bits = [], i;
  pushBits(bits, s.id, 15);
  pushBits(bits, s.ext ? 1 : 0, 1);
  pushBits(bits, s.e, 4);
  pushBits(bits, s.groupIndex, 4);
  pushBits(bits, s.groupThreshold - 1, 4);
  pushBits(bits, s.groupCount - 1, 4);
  pushBits(bits, s.memberIndex, 4);
  pushBits(bits, s.memberThreshold - 1, 4);

  var valueBits = s.value.length * 8;
  var valueWords = Math.ceil(valueBits / 10);
  for (i = 0; i < valueWords * 10 - valueBits; i++) bits.push(0);
  for (i = 0; i < s.value.length; i++) pushBits(bits, s.value[i], 8);

  var idx = [];
  for (i = 0; i < bits.length; i += 10) {
    var w = 0;
    for (var j = 0; j < 10; j++) w = (w << 1) | bits[i + j];
    idx.push(w);
  }
  idx = idx.concat(rs1024Checksum(idx, s.ext));
  return idx.map(function (w) { return SLIP39_WORDS[w]; }).join(' ');
}

function decodeMnemonic(mnemonic) {
  var words = String(mnemonic).toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length < 20) throw new Error('A share must be at least 20 words.');

  var idx = words.map(function (w) {
    var i = SLIP39_WORDS.indexOf(w);
    if (i < 0) throw new Error('"' + w + '" is not a SLIP-39 word.');
    return i;
  });

  // The extendable flag selects the checksum's customization string, so it has
  // to be read before the checksum can be verified. The second word holds the
  // low 5 bits of the id, then ext, then the 4-bit iteration exponent.
  var ext = (idx[1] >> 4) & 1;
  if (!rs1024Verify(idx, ext)) throw new Error('This share failed its checksum — check for a mistyped word.');

  var bits = [], i, j;
  for (i = 0; i < idx.length; i++) pushBits(bits, idx[i], 10);
  var at = 0;
  function take(n) { var v = 0; for (var k = 0; k < n; k++) v = (v << 1) | bits[at++]; return v; }

  var out = {
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

  // The secret is a whole number of 16-bit units, so the padding is
  // whatever the 10-bit words carry beyond that.
  var valueWords = words.length - METADATA_WORDS;
  var padding = (valueWords * 10) % 16;
  if (padding > 8) throw new Error('Invalid share length.');
  for (i = 0; i < padding; i++) {
    if (bits[at + i] !== 0) throw new Error('Invalid share: padding bits are not zero.');
  }
  at += padding;

  var valueBytes = (valueWords * 10 - padding) / 8;
  var value = new Uint8Array(valueBytes);
  for (i = 0; i < valueBytes; i++) value[i] = take(8);
  out.value = value;
  return out;
}

/* ============================================================
   Master-secret encryption

   Four-round Feistel with PBKDF2-HMAC-SHA256 as the round function.
   In extendable mode the salt is empty, so nothing has to travel
   alongside the share to decrypt it later.
   ============================================================ */

function encryptionSalt(id, ext) {
  if (ext) return new Uint8Array(0);
  return concatBytes(utf8.encode(CS_NON_EXTENDABLE), new Uint8Array([id >> 8, id & 0xff]));
}

function roundFunction(i, passphrase, e, salt, r) {
  var password = concatBytes(new Uint8Array([i]), passphrase);
  var iterations = (BASE_ITERATIONS << e) / ROUNDS;
  return pbkdf2('SHA-256', password, concatBytes(salt, r), iterations, r.length);
}

function feistel(data, passphrase, e, id, ext, forward) {
  var half = data.length / 2;
  var l = data.subarray(0, half), r = data.subarray(half);
  var salt = encryptionSalt(id, ext);
  var order = [];
  for (var i = 0; i < ROUNDS; i++) order.push(forward ? i : ROUNDS - 1 - i);

  return order.reduce(function (chain, i) {
    return chain.then(function () {
      return roundFunction(i, passphrase, e, salt, r);
    }).then(function (f) {
      var next = xorBytes(l, f);
      l = r; r = next;
    });
  }, Promise.resolve()).then(function () {
    return concatBytes(r, l);
  });
}

function encryptMasterSecret(secret, passphrase, e, id, ext) {
  return feistel(secret, passphrase, e, id, ext, true);
}

function decryptMasterSecret(ems, passphrase, e, id, ext) {
  return feistel(ems, passphrase, e, id, ext, false);
}

/* ============================================================
   Shamir split and recover
   ============================================================ */

function createDigest(randomPart, sharedSecret) {
  return hmac('SHA-256', randomPart, sharedSecret).then(function (mac) {
    return mac.subarray(0, DIGEST_BYTES);
  });
}

function splitSecret(threshold, count, secret) {
  if (threshold < 1 || threshold > count || count > 16) {
    return Promise.reject(new Error('Invalid threshold or share count.'));
  }
  if (threshold === 1) {
    var copies = [];
    for (var i = 0; i < count; i++) copies.push({ x: i, y: new Uint8Array(secret) });
    return Promise.resolve(copies);
  }

  var randomCount = threshold - 2, shares = [], j;
  for (j = 0; j < randomCount; j++) shares.push({ x: j, y: randomBytes(secret.length) });
  var randomPart = randomBytes(secret.length - DIGEST_BYTES);

  return createDigest(randomPart, secret).then(function (digest) {
    var base = shares.concat([
      { x: DIGEST_INDEX, y: concatBytes(digest, randomPart) },
      { x: SECRET_INDEX, y: secret }
    ]);
    for (var k = randomCount; k < count; k++) {
      shares.push({ x: k, y: interpolate(base, k) });
    }
    return shares;
  });
}

function recoverSecret(threshold, shares) {
  if (threshold === 1) return Promise.resolve(new Uint8Array(shares[0].y));
  var secret = interpolate(shares, SECRET_INDEX);
  var digestShare = interpolate(shares, DIGEST_INDEX);
  var digest = digestShare.subarray(0, DIGEST_BYTES);
  var randomPart = digestShare.subarray(DIGEST_BYTES);
  return createDigest(randomPart, secret).then(function (expected) {
    if (bytesToHex(expected) !== bytesToHex(digest)) {
      throw new Error('These shares do not belong together.');
    }
    return secret;
  });
}

/* ============================================================
   Public API — single group, threshold of count
   ============================================================ */

function generateShares(secret, threshold, count, passphrase, e) {
  if (secret.length < 16 || secret.length % 2 !== 0) {
    return Promise.reject(new Error('The secret must be at least 128 bits and a whole number of 16-bit units.'));
  }
  var idBytes = randomBytes(2);
  var id = ((idBytes[0] << 8) | idBytes[1]) & 0x7fff;
  var exp = e === undefined ? 1 : e;
  var pass = passphrase ? utf8.encode(passphrase) : new Uint8Array(0);

  return encryptMasterSecret(secret, pass, exp, id, true).then(function (ems) {
    return splitSecret(threshold, count, ems);
  }).then(function (shares) {
    return shares.map(function (s) {
      return encodeMnemonic({
        id: id, ext: true, e: exp,
        groupIndex: 0, groupThreshold: 1, groupCount: 1,
        memberIndex: s.x, memberThreshold: threshold, value: s.y
      });
    });
  });
}

function combineMnemonics(mnemonics, passphrase) {
  if (!mnemonics || !mnemonics.length) return Promise.reject(new Error('No shares given.'));

  var decoded = mnemonics.map(decodeMnemonic);
  var first = decoded[0], i;
  for (i = 1; i < decoded.length; i++) {
    var d = decoded[i];
    if (d.id !== first.id || d.ext !== first.ext || d.e !== first.e ||
      d.groupThreshold !== first.groupThreshold || d.groupCount !== first.groupCount) {
      throw new Error('These shares come from different backups.');
    }
  }

  // Bucket by group, then recover each group secret from its members.
  var groups = {};
  decoded.forEach(function (d) {
    var g = groups[d.groupIndex] || (groups[d.groupIndex] = { threshold: d.memberThreshold, members: [] });
    if (g.threshold !== d.memberThreshold) throw new Error('Inconsistent member thresholds within a group.');
    if (g.members.some(function (m) { return m.x === d.memberIndex; })) {
      throw new Error('The same share was supplied twice.');
    }
    g.members.push({ x: d.memberIndex, y: d.value });
  });

  var indices = Object.keys(groups);
  var usable = indices.filter(function (gi) {
    return groups[gi].members.length >= groups[gi].threshold;
  });
  if (usable.length < first.groupThreshold) {
    throw new Error('Not enough shares — need ' + first.groupThreshold +
      ' group' + (first.groupThreshold === 1 ? '' : 's') + '.');
  }
  usable = usable.slice(0, first.groupThreshold);

  indices.forEach(function (gi) {
    var g = groups[gi];
    if (g.members.length !== g.threshold && usable.indexOf(gi) >= 0) {
      throw new Error('Wrong number of shares for group ' + gi + '.');
    }
  });

  return Promise.all(usable.map(function (gi) {
    var g = groups[gi];
    return recoverSecret(g.threshold, g.members).then(function (y) {
      return { x: Number(gi), y: y };
    });
  })).then(function (groupShares) {
    return recoverSecret(first.groupThreshold, groupShares);
  }).then(function (ems) {
    var pass = passphrase ? utf8.encode(passphrase) : new Uint8Array(0);
    return decryptMasterSecret(ems, pass, first.e, first.id, first.ext);
  });
}

/* ============================================================
   BIP-39
   ============================================================ */

function bip39ToEntropy(phrase) {
  var words = String(phrase).toLowerCase().trim().split(/\s+/).filter(Boolean);
  if ([12, 15, 18, 21, 24].indexOf(words.length) < 0) {
    throw new Error('A BIP-39 phrase must be 12, 15, 18, 21 or 24 words.');
  }
  var bits = [];
  words.forEach(function (w) {
    var i = BIP39_WORDS.indexOf(w);
    if (i < 0) throw new Error('"' + w + '" is not a BIP-39 word.');
    pushBits(bits, i, 11);
  });
  var checkBits = bits.length / 33;
  var entBits = bits.length - checkBits;
  var entropy = new Uint8Array(entBits / 8), i;
  for (i = 0; i < entropy.length; i++) {
    var v = 0;
    for (var j = 0; j < 8; j++) v = (v << 1) | bits[i * 8 + j];
    entropy[i] = v;
  }
  return sha256(entropy).then(function (h) {
    for (var k = 0; k < checkBits; k++) {
      if (((h[k >> 3] >> (7 - (k & 7))) & 1) !== bits[entBits + k]) {
        throw new Error('That phrase fails its BIP-39 checksum — check for a mistyped word.');
      }
    }
    return entropy;
  });
}

function bip39FromEntropy(entropy) {
  return sha256(entropy).then(function (h) {
    var bits = [], i;
    for (i = 0; i < entropy.length; i++) pushBits(bits, entropy[i], 8);
    var checkBits = entropy.length * 8 / 32;
    for (i = 0; i < checkBits; i++) bits.push((h[i >> 3] >> (7 - (i & 7))) & 1);
    var words = [];
    for (i = 0; i < bits.length; i += 11) {
      var v = 0;
      for (var j = 0; j < 11; j++) v = (v << 1) | bits[i + j];
      words.push(BIP39_WORDS[v]);
    }
    return words.join(' ');
  });
}

function bip39Seed(phrase, passphrase) {
  var norm = String(phrase).normalize('NFKD');
  var salt = ('mnemonic' + String(passphrase || '')).normalize('NFKD');
  return pbkdf2('SHA-512', utf8.encode(norm), utf8.encode(salt), 2048, 64);
}

/* ============================================================
   WebAuthn largeBlob

   Each YubiKey holds one discoverable credential and one blob, bound to
   this page's hostname. A credential cannot be read from any other
   origin, so enrolling at localhost and enrolling at a website produce
   two separate, non-interchangeable backups.
   ============================================================ */

var RECORD_VERSION = 1;
var BLOB_BUDGET = 900;   // spec guarantees >= 1024 serialized; leave headroom

function rpId() { return location.hostname; }

function challenge() { return crypto.getRandomValues(new Uint8Array(32)); }

// Credential IDs minted during this session, passed to create() as
// excludeCredentials so the authenticator itself refuses a key we have
// already written to. Costs no extra ceremony and cannot be cancelled past.
var enrolledIds = [];

/* Chrome permits only one WebAuthn request at a time, and a rejected one
   takes a moment to tear down. With a real key the human takes seconds
   between ceremonies so this never shows; with a DevTools virtual
   authenticator the calls resolve instantly and the next request lands while
   the previous is still closing, which surfaces as an intermittent failure
   that succeeds on retry. Yield to the event loop between ceremonies. */
function settle(ms) {
  return new Promise(function (r) { setTimeout(r, ms || 300); });
}

/* A credential created for a share whose blob write then failed.

   Every create() burns a resident slot on the key, and those slots are finite —
   25 before firmware 5.7, 100 after. Without this, each retry would leave
   another unused credential behind, and once a key carries several of them
   Chrome starts showing an account picker on every read, which breaks the
   restore flow. So a retry reuses the credential it already made rather than
   minting a fresh one. */
var pendingCred = null;    // { i: shareIndex, id: rawId }

function friendlyAuthError(e) {
  if (!e) return new Error('The key did not respond.');
  if (e.name === 'InvalidStateError') {
    return new Error('This key already holds a share from this backup. Use a different one.');
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

/* Does this key already hold a share from this backup?

   `excludeCredentials` only knows about credentials made since the page loaded,
   so it cannot see a key that was written to in an earlier session. This asks
   the key directly, by trying to read a share off it.

   Deliberately tolerant: WebAuthn cannot distinguish "no credential here" from
   "user cancelled", so only a positive find blocks the write. Anything else —
   rejection, timeout, unreadable blob — falls through and lets the write
   proceed, because a false refusal is worse than a missed duplicate.

   THIS MUST BE ITS OWN USER PRESS. Chaining `create()` and the blob write
   behind it inside one press makes the write return `written: false` every
   time — the rejected read appears to leave Chrome holding a PIN token without
   the large-blob-write permission, and everything after it in that press
   inherits it. A new press gets a fresh token. Confirmed on both a cluttered
   and a clean authenticator.

   So the flow is: press one checks, press two creates and writes. Those two
   must stay together, since `create` → `write` in a single press is the
   sequence known to work. */
function existingShareOnKey() {
  return navigator.credentials.get({
    publicKey: {
      challenge: challenge(),
      rpId: rpId(),
      allowCredentials: [],
      userVerification: 'required',
      timeout: 60000,
      extensions: { largeBlob: { read: true } }
    }
  }).then(function (assertion) {
    var ext = assertion && assertion.getClientExtensionResults();
    if (!ext || !ext.largeBlob || !ext.largeBlob.blob) return null;
    try {
      var rec = JSON.parse(new TextDecoder().decode(new Uint8Array(ext.largeBlob.blob)));
      return (rec && rec.v === RECORD_VERSION && rec.share) ? rec : null;
    } catch (e) { return null; }
  }, function () { return null; });
}

/* One press per key: check the key is free, create the credential, then write
   the blob. WebAuthn only writes a large blob during an assertion, never at
   registration, so the write is always its own ceremony. */
function writeShareToKey(record) {
  var bytes = utf8.encode(JSON.stringify(record));
  if (bytes.length > BLOB_BUDGET) {
    return Promise.reject(new Error('That label is too long to fit alongside the share.'));
  }
  // A previous press created a credential but failed to write to it. Reuse it
  // rather than registering another — each create() burns a resident slot, and
  // several credentials for one origin make Chrome show a picker on every read.
  if (pendingCred && pendingCred.i === record.i) {
    var resumeId = pendingCred.id;
    return writeBlob(resumeId, bytes).then(function () {
      pendingCred = null;
      return true;
    }).catch(function (e) {
      pendingCred = null;
      throw friendlyAuthError(e);
    });
  }
  // No read here — the check ran in its own press. See existingShareOnKey().
  return Promise.resolve().then(function () {
    return navigator.credentials.create({
      publicKey: {
        challenge: challenge(),
        rp: { id: rpId(), name: 'YubiShard' },
        user: {
          id: crypto.getRandomValues(new Uint8Array(16)),
          // This is what Chrome's picker and `ykman fido credentials list`
          // show, so it carries the user's own label for the key — a bare
          // share number is no help when you are holding five of them.
          name: 'YubiShard: ' + record.label
            + ' (share-' + (record.i + 1) + '-of-' + record.n + ')',
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
        // Backstop for the check above: the authenticator refuses outright
        // if this key already took a share earlier in this session.
        excludeCredentials: enrolledIds.map(function (id) {
          return { type: 'public-key', id: id };
        }),
        timeout: 120000,
        attestation: 'none',
        extensions: { largeBlob: { support: 'required' } }
      }
    });
  }).then(function (cred) {
    if (!cred) throw new Error('The key did not return a credential.');
    var ext = cred.getClientExtensionResults();
    if (!ext.largeBlob || ext.largeBlob.supported !== true) {
      throw new Error('This key cannot store a share. largeBlob needs YubiKey firmware 5.7 or '
        + 'newer — check yours with "ykman info".');
    }
    enrolledIds.push(cred.rawId);
    // Remembered so that if the write below fails, the next press retries
    // against this credential instead of creating a second one.
    pendingCred = { i: record.i, id: cred.rawId };
    return settle().then(function () {
      return writeBlob(cred.rawId, bytes);
    }).then(function (ok) {
      pendingCred = null;
      return ok;
    });
  }).catch(function (e) { throw friendlyAuthError(e); });
}

/* The blob write. One attempt — every retry costs the user a PIN and a touch,
   and a write that is going to fail fails consistently rather than flakily.
   If it does fail, `pendingCred` lets the next press retry on the same
   credential. */
function writeBlob(credId, bytes) {
  return navigator.credentials.get({
    publicKey: {
      challenge: challenge(),
      rpId: rpId(),
      allowCredentials: [{ type: 'public-key', id: credId }],
      userVerification: 'required',
      timeout: 120000,
      extensions: { largeBlob: { write: bytes } }
    }
  }).then(function (assertion) {
    var ext = assertion && assertion.getClientExtensionResults();
    var lb = ext && ext.largeBlob;
    if (lb && lb.written === true) return true;

    // `written` is not trustworthy on its own — Chrome's DevTools virtual
    // authenticator stores the blob and still reports false. Ask the key what
    // it actually holds rather than believing the flag. This costs an extra PIN
    // and touch, but only on the path that would otherwise have failed.
    return confirmBlob(credId, bytes).then(function (check) {
      if (check.ok) return true;
      var got = lb ? 'written=' + JSON.stringify(lb.written)
        : 'no largeBlob result (' + JSON.stringify(ext) + ')';
      throw Object.assign(new Error('The key did not store the share — the write reported ' + got
        + ', and reading it back ' + check.why + '.'), { notWritten: true });
    });
  });
}

/* Read the blob back off one specific credential and compare it byte for byte
   with what we meant to store. Reading a known credential id is safe here — it
   is the empty-allowCredentials discoverable read that must never precede a
   write, and this happens afterwards.

   Returns { ok, why }. `why` is reported to the user verbatim: swallowing the
   reason here turns every distinct cause into the same dead end. */
function confirmBlob(credId, expected) {
  return navigator.credentials.get({
    publicKey: {
      challenge: challenge(),
      rpId: rpId(),
      allowCredentials: [{ type: 'public-key', id: credId }],
      userVerification: 'required',
      timeout: 120000,
      extensions: { largeBlob: { read: true } }
    }
  }).then(function (assertion) {
    var ext = assertion && assertion.getClientExtensionResults();
    var lb = ext && ext.largeBlob;
    if (!lb) {
      return { ok: false, why: 'returned no largeBlob result at all — this browser or key may not '
        + 'support reading blobs back' };
    }
    if (!lb.blob) {
      return { ok: false, why: 'found the credential but no blob on it' };
    }
    var got = new Uint8Array(lb.blob);
    if (got.length !== expected.length) {
      return { ok: false, why: 'found a blob of ' + got.length + ' bytes where '
        + expected.length + ' were written' };
    }
    for (var i = 0; i < got.length; i++) {
      if (got[i] !== expected[i]) {
        return { ok: false, why: 'found a blob that differs from what was written, at byte ' + i };
      }
    }
    return { ok: true, why: '' };
  }, function (e) {
    return { ok: false, why: 'failed with ' + (e && e.name ? e.name : 'an unknown error')
      + (e && e.message ? ' (' + e.message + ')' : '') };
  });
}

function readShareFromKey() {
  return navigator.credentials.get({
    publicKey: {
      challenge: challenge(),
      rpId: rpId(),
      allowCredentials: [],
      userVerification: 'required',
      timeout: 120000,
      extensions: { largeBlob: { read: true } }
    }
  }).then(function (assertion) {
    var ext = assertion && assertion.getClientExtensionResults();
    if (!ext || !ext.largeBlob || !ext.largeBlob.blob) {
      // A key enrolled at a different origin is indistinguishable from a blank
      // one here, so the message has to cover both.
      throw new Error('No YubiShard share on this key for ' + rpId() + '. If you enrolled it at '
        + 'the other address, open that one instead.');
    }
    var rec;
    try { rec = JSON.parse(new TextDecoder().decode(new Uint8Array(ext.largeBlob.blob))); }
    catch (e) { rec = null; }
    if (!rec || rec.v !== RECORD_VERSION || !rec.share) {
      throw new Error('What is stored on this key is not a YubiShard share.');
    }
    return rec;
  }).catch(function (e) { throw friendlyAuthError(e); });
}

/* ============================================================
   Environment

   file:// is a secure context, so crypto.subtle works there — but it has
   no hostname, and WebAuthn derives its relying-party ID from one. That
   is the reason a server is required, not TLS.
   ============================================================ */

function envReport() {
  if (location.protocol === 'file:') {
    return {
      ok: false, html: '<b>This page needs a web address.</b> A security key identifies a '
        + 'site by its hostname, and a <code>file://</code> URL has none — so no key can be used '
        + 'here. Run <code>serve.command</code> (macOS) or <code>serve.bat</code> (Windows) from '
        + 'this folder and open <code>http://localhost:8000/</code>.'
    };
  }
  if (!window.isSecureContext || !window.PublicKeyCredential || !navigator.credentials) {
    return {
      ok: false, html: '<b>This browser cannot use security keys here.</b> YubiShard needs '
        + 'Chrome on macOS or Windows 11, opened over <code>http://localhost</code> or https.'
    };
  }
  var host = location.hostname;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host) || host.indexOf(':') >= 0) {
    return {
      ok: false, html: '<b>Use <code>localhost</code>, not an IP address.</b> A bare IP can '
        + 'never identify a site to a security key. Open <code>http://localhost:'
        + (location.port || '8000') + '/</code> instead.'
    };
  }
  var parts = [];
  if (!window.chrome) {
    parts.push('<b>This browser is probably not supported.</b> Storing a share on a key uses the '
      + 'largeBlob extension, which Firefox does not implement and does not plan to. Use Chrome.');
  }
  parts.push('Keys enrolled here are tied to <b><code>' + esc(host) + '</code></b> and can only be '
    + 'read back at this same address.');
  if (host !== 'localhost') {
    parts.push('<b>You are running this from yubishard.com.</b> The code reached you over the network '
      + 'moments before your seed enters this tab\'s memory, and if this domain ever lapses the '
      + 'shares on those keys can never be read again. Serving the file locally avoids both.');
  }
  return { ok: true, html: parts.join(' ') };
}

/* ============================================================
   State
   ============================================================ */

var state = {
  dark: false, view: 'home', step: 0,

  // phrase entry
  count: 12, words: fill(12, ''), inputPass: '',
  secret: null, seedFp: '', verifyFp: '', seedErr: '',

  // split
  n: 5, m: 3, shares: [],

  // writing shares onto keys
  written: [], keyLabel: '', busy: false, writeErr: '', revealed: -1,
  // Index of the share whose key has been checked and found free. The check is
  // its own press because a read and a write cannot share one — see
  // existingShareOnKey().
  checkedFor: -1,

  // read-back gate
  vRecords: [], verifyMsg: '', verifyOk: null,

  // restore
  rRecords: [], readErr: '', pasteMode: false, pasted: ['', '', ''],
  rSeed: '', rFp: '', rKind: '', rAlt: '',
  reveal: false, seedCopied: false,

  env: envReport()
};

function fill(n, v) { return Array.apply(null, Array(n)).map(function () { return v; }); }
function setState(patch) { Object.assign(state, patch); render(); }

function seedPhrase() {
  return state.words.map(function (w) { return w.trim().toLowerCase(); })
    .filter(Boolean).join(' ');
}

function allWordsIn() { return state.words.every(function (w) { return w.trim().length > 0; }); }

/* 20 words is a SLIP-39 master secret; 12 and 24 are BIP-39 entropy. The two
   are not interchangeable — see the note under the passphrase field. */
function isSlip39() { return state.count === 20; }

function standardLabel() {
  if (state.count === 20) return 'SLIP-39 · 128-bit master secret';
  return 'BIP-39 · ' + (state.count === 12 ? '128' : '256') + '-bit entropy';
}

function originKind() {
  if (state.count === 20) return 'slip39-128';
  return state.count === 12 ? 'bip39-128' : 'bip39-256';
}

/* ============================================================
   DOM helpers
   ============================================================ */

function $(sel, root) { return (root || document).querySelector(sel); }

function setText(el, s) { if (el && el.textContent !== s) el.textContent = s; }

// Never fight the caret: only write into a field the user is not editing.
function setVal(el, v) {
  if (el && el !== document.activeElement && el.value !== v) el.value = v;
}

function show(el, on) { if (el) el.hidden = !on; }

function esc(t) {
  return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Grow/shrink `container` to `count` children, then update each in place.
// Surviving nodes are never replaced, so inputs keep focus and selection.
function syncList(container, tplId, count, update) {
  var tpl = document.getElementById(tplId);
  while (container.children.length > count) container.removeChild(container.lastElementChild);
  while (container.children.length < count) {
    container.appendChild(tpl.content.firstElementChild.cloneNode(true));
  }
  for (var i = 0; i < count; i++) {
    var el = container.children[i];
    el.dataset.i = String(i);
    update(el, i);
  }
}

/* ============================================================
   Clipboard
   ============================================================ */

// navigator.clipboard is unavailable or rejects on some origins.
function legacyCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.top = '-1000px';
  document.body.appendChild(ta);
  ta.select();
  var ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  document.body.removeChild(ta);
  return ok;
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(
      function () { return true; },
      function () { return legacyCopy(text); }
    );
  }
  return Promise.resolve(legacyCopy(text));
}

/* ============================================================
   Reading the entered phrase

   Async because both branches end in WebCrypto. A token guards against an
   older keystroke's result landing after a newer one.
   ============================================================ */

var seedToken = 0;

function readEnteredSeed() {
  var phrase = seedPhrase(), pass = state.inputPass;
  if (isSlip39()) {
    // A Trezor single-share backup is a 20-word 1-of-1 SLIP-39 mnemonic, and
    // its master secret is the BIP-32 seed directly.
    return combineMnemonics([phrase], pass).then(function (secret) {
      return { secret: secret, seed: secret };
    });
  }
  // BIP-39 runs the words through PBKDF2 to reach the seed, so the entropy we
  // split and the seed we fingerprint are different values.
  return bip39ToEntropy(phrase).then(function (entropy) {
    return bip39Seed(phrase, pass).then(function (seed) {
      return { secret: entropy, seed: seed };
    });
  });
}

/* The fingerprint a restore can reproduce unaided: always derived with an
   empty passphrase, so it never depends on something the user has to
   remember. The *displayed* fingerprint identifies the wallet and folds in a
   BIP-39 passphrase; this one only has to prove the bytes came back intact.
   Both sides call this same function so they cannot drift apart. */
function verificationFingerprint(secret, of) {
  if (of === 'bip39-128' || of === 'bip39-256') {
    return bip39FromEntropy(secret).then(function (phrase) {
      return bip39Seed(phrase, '').then(bip32Fingerprint);
    });
  }
  return bip32Fingerprint(secret);
}

function refreshSeed() {
  var token = ++seedToken;
  if (!allWordsIn()) {
    if (state.secret || state.seedFp || state.seedErr) {
      setState({ secret: null, seedFp: '', verifyFp: '', seedErr: '' });
    }
    return;
  }
  readEnteredSeed().then(function (r) {
    if (token !== seedToken) return;
    setState({ secret: r.secret, seedErr: '' });
    return Promise.all([
      bip32Fingerprint(r.seed),
      verificationFingerprint(r.secret, originKind())
    ]).then(function (fps) {
      if (token === seedToken) setState({ seedFp: fps[0], verifyFp: fps[1] });
    });
  }).catch(function (e) {
    if (token === seedToken) {
      setState({ secret: null, seedFp: '', verifyFp: '', seedErr: e.message });
    }
  });
}

/* ============================================================
   Render
   ============================================================ */

function backupSteps() {
  return [
    {
      title: 'Recovery phrase', note: allWordsIn() ? state.count + ' words entered'
        : 'Enter your ' + state.count + '-word phrase'
    },
    { title: 'Split settings', note: state.m + ' of ' + state.n + ' keys' },
    { title: 'Write to keys', note: state.written.length + ' of ' + state.n + ' written' },
    { title: 'Verify restore', note: 'Required — proves the keys work' },
    { title: 'Store them apart', note: 'Different places, then wipe' }
  ];
}

function restoreSteps() {
  return [
    {
      title: 'Read your keys', note: state.rRecords.length
        ? state.rRecords.length + ' of ' + state.rRecords[0].m + ' read' : 'One key at a time'
    },
    { title: 'Read your phrase', note: 'Then close the tab' }
  ];
}

function showPanels() {
  var v = state.view, s = state.step;
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
  var steps = state.view === 'restore' ? restoreSteps() : backupSteps();
  setText($('#flow-kicker'), state.view === 'restore' ? 'Restore' : 'Backup');
  setText($('#flow-title'), state.view === 'restore' ? 'Rebuild your seed' : 'Split onto keys');
  syncList($('#stepper'), 'tpl-step', steps.length, function (el, i) {
    var done = i < state.step, active = i === state.step;
    el.classList.toggle('is-done', done);
    el.classList.toggle('is-active', active);
    setText($('.step-dot', el), done ? '✓' : String(i + 1));
    setText($('.step-title', el), steps[i].title);
    setText($('.step-note', el), steps[i].note);
  });
}

function renderSeed() {
  var filled = state.words.filter(function (w) { return w.trim(); }).length;
  setText($('#word-progress'), filled + ' / ' + state.count + ' words');
  setText($('#std-hint'), standardLabel());
  $('#chip12').classList.toggle('is-on', state.count === 12);
  $('#chip20').classList.toggle('is-on', state.count === 20);
  $('#chip24').classList.toggle('is-on', state.count === 24);
  var grid = $('#wordgrid');
  grid.classList.toggle('cols-4', state.count === 24);
  syncList(grid, 'tpl-word', state.count, function (el, i) {
    setText($('.word-n', el), String(i + 1));
    setVal($('input', el), state.words[i] || '');
  });
  setVal($('#input-pass'), state.inputPass);
  setText($('#pass-help'), isSlip39()
    ? 'Decrypts this share. A wrong one silently produces a different secret — check the '
    + 'fingerprint below against what you recorded.'
    : 'Changes which wallet the phrase opens, and so the fingerprint. It is NOT stored in the '
    + 'shares — you must remember it separately to restore this wallet.');
  $('#seed-next').disabled = !state.secret;
  setText($('#seed-fp'), state.seedFp);
  show($('#seed-fp-wrap'), !!state.seedFp);
  show($('#seed-blocked'), !allWordsIn());
  setText($('#seed-err'), state.seedErr);
  show($('#seed-err'), !!state.seedErr);
}

function renderSplit() {
  setText($('#n-val'), String(state.n));
  setText($('#m-val'), String(state.m));
  setVal($('#n-range'), String(state.n));
  $('#m-range').max = String(state.n);
  setVal($('#m-range'), String(state.m));
  syncList($('#viz'), 'tpl-viz', state.n, function (el, i) {
    el.classList.toggle('is-needed', i < state.m);
    setText($('span', el), '#' + (i + 1));
  });
  var sentence;
  if (state.n === 1) {
    sentence = 'One key holding one share. No splitting — this is a single copy of your seed, and '
      + 'losing that key loses it.';
  } else if (state.m === 1) {
    sentence = 'Any single key rebuilds your seed on its own — convenient, but one stolen key and '
      + 'its PIN is a stolen wallet.';
  } else {
    sentence = 'Any ' + state.m + ' of the ' + state.n + ' keys rebuild your seed. Any '
      + (state.m - 1) + ' reveal nothing at all.';
  }
  setText($('#split-sentence'), sentence);
  setText($('#split-note'), 'You will need ' + state.n + ' YubiKeys, one per share, each on '
    + 'firmware 5.7 or newer. A key cannot be cloned, so losing more than '
    + (state.n - state.m) + ' of them loses the backup. Have them all to hand before you start.');
  setText($('#split-next'), state.busy ? 'Splitting…' : 'Split into ' + state.n + ' shares');
  $('#split-next').disabled = state.busy;
}

function renderWrite() {
  setText($('#pin-note'), 'Chrome will ask you to set a PIN if the key has none, and 0000 is '
    + 'accepted. The PIN is the only thing protecting a share on a key you lose, so a known '
    + 'default means anyone holding ' + state.m + ' of these keys has your seed. Whichever you '
    + 'pick, write it down: eight wrong attempts wipes a key, and a PIN forgotten across every '
    + 'key cannot be recovered.');
  syncList($('#enc-rows'), 'tpl-enc-row', state.n, function (el, i) {
    var done = state.written[i];
    var active = !done && i === state.written.length;
    // A credential was registered but its share never stored, so the next press
    // finishes that one rather than starting over.
    var resuming = active && !!(pendingCred && pendingCred.i === i);
    el.classList.toggle('is-active', active);
    el.classList.toggle('is-done', !!done);
    setText($('.row-dot', el), done ? '✓' : String(i + 1));
    setText($('.row-title', el), 'Share ' + (i + 1) + ' of ' + state.n);
    setText($('.row-sub', el), done ? done.label
      : active ? 'Plug in the key for this share' : 'Waiting');
    var status = $('.status', el);
    setText(status, done ? 'On the key' : active ? 'Your turn' : 'Not started');
    status.className = 'status ' + (done ? 'ok' : active ? 'active' : 'idle');
    show($('.row-body', el), active);
    show($('.row-done', el), !!done);
    if (active) {
      // Two presses: check the key is free, then write. They cannot be merged.
      var checked = state.checkedFor === i;
      setVal($('.f-label', el), state.keyLabel);
      $('.f-label', el).disabled = resuming;
      $('.f-write', el).disabled = state.busy;
      $('.f-write', el).dataset.act = (checked || resuming) ? 'write-key' : 'check-key';
      show($('.spinner', el), state.busy);
      setText($('.f-write-text', el), state.busy ? 'Follow the prompts…'
        : resuming ? 'Try storing the share again'
          : checked ? 'Write the share to this key' : 'Check this key is free');
      setText($('.f-hint', el), state.busy ? 'PIN and touch'
        : resuming ? 'The key is already set up — this retries just the share'
          : checked ? 'Key is free. Leave it plugged in — this press stores the share.'
            : 'Step 1 of 2 · confirms the key holds no other share');
      setText($('.f-err', el), state.writeErr);
    }
    if (done) {
      setText($('.f-stored', el), state.revealed === i ? state.shares[i]
        : 'Stored on the key. The words are hidden — the key is meant to be the only copy.');
      setText($('.f-reveal', el), state.revealed === i ? 'Hide words' : 'Show words');
    }
  });
  show($('#to-verify-wrap'), state.written.length === state.n);
}

function renderVerify() {
  setText($('#verify-sub'), 'Unplug each key, plug it back in, and read the share off it. This '
    + 'proves the write worked while you can still redo it — there is no paper copy to fall back '
    + 'on. ' + state.m + ' of the ' + state.n + ' keys are needed.');
  syncList($('#verify-rows'), 'tpl-read-row', state.vRecords.length, function (el, i) {
    var r = state.vRecords[i];
    setText($('.row-title', el), 'Share ' + (r.i + 1) + ' of ' + r.n);
    setText($('.row-sub', el), r.label);
  });
  var left = state.m - state.vRecords.length;
  setText($('#verify-btn-text'), state.busy ? 'Follow the prompts…'
    : 'Read a YubiKey' + (left > 0 ? ' (' + left + ' to go)' : ''));
  show($('#verify-spin'), state.busy);
  $('#verify-btn').disabled = state.busy;
  var msg = $('#verify-msg');
  setText(msg, state.verifyMsg);
  msg.className = 'result ' + (state.verifyOk ? 'ok' : 'err');
}

function renderDone() {
  setText($('#done-badge'), 'Verified — ' + state.m + ' keys rebuilt your seed');
  setText($('#done-fp'), state.seedFp);
  setText($('#recovery-note'), 'To restore: open this tool at ' + rpId() + ', choose Restore, and '
    + 'read any ' + state.m + ' of the ' + state.n + ' keys. Shares are bound to that address and '
    + 'cannot be read anywhere else. If this tool is ever gone, python-fido2 can read the blob off '
    + 'a key given its PIN. Record the address, the ' + state.m + '-of-' + state.n + ' threshold, '
    + 'the fingerprint above, and your PIN.');
  syncList($('#done-grid'), 'tpl-done-card', state.written.length, function (el, i) {
    setText($('.done-num', el), '#' + (i + 1));
    setText($('.done-label', el), state.written[i].label);
    setText($('.done-blob', el), 'Share ' + (i + 1) + ' of ' + state.n + ' — on the key.');
  });
}

function renderCollect() {
  syncList($('#collect-rows'), 'tpl-read-row', state.rRecords.length, function (el, i) {
    var r = state.rRecords[i];
    setText($('.row-title', el), 'Share ' + (r.i + 1) + ' of ' + r.n);
    setText($('.row-sub', el), r.label);
  });
  var need = state.rRecords.length ? state.rRecords[0].m : null;
  var left = need === null ? null : need - state.rRecords.length;
  setText($('#read-btn-text'), state.busy ? 'Follow the prompts…'
    : 'Read a YubiKey' + (left > 0 ? ' (' + left + ' to go)' : ''));
  show($('#read-spin'), state.busy);
  $('#read-btn').disabled = state.busy;
  setText($('#collect-hint'), need === null
    ? 'The threshold is stored with the first share you read.'
    : 'This backup needs ' + need + ' of ' + state.rRecords[0].n + ' keys.');
  setText($('#read-err'), state.readErr);
  show($('#read-err'), !!state.readErr);

  show($('#paste-wrap'), state.pasteMode);
  if (state.pasteMode) {
    syncList($('#paste-rows'), 'tpl-paste-row', state.pasted.length, function (el, i) {
      var t = (state.pasted[i] || '').trim();
      var n = t ? t.split(/\s+/).length : 0;
      var ok = n === 20 || n === 33;
      el.classList.toggle('is-bad', !!t && !ok);
      setText($('.crow-head span:first-child', el), 'Share ' + (i + 1));
      var hint = $('.hint', el);
      setText(hint, !t ? '' : ok ? n + ' words' : n + ' words — expected 20 or 33');
      hint.className = 'hint ' + (ok ? 'ok' : 'err');
      setVal($('textarea', el), state.pasted[i] || '');
    });
  }
}

function renderRestored() {
  var words = state.rSeed ? state.rSeed.split(' ') : [];
  setText($('#restored-kind'), state.rKind);
  setText($('#restored-fp'), state.rFp);
  var grid = $('#words-out');
  grid.classList.toggle('cols-4', words.length > 12);
  grid.classList.toggle('is-hidden', !state.reveal);
  syncList(grid, 'tpl-word-out', words.length, function (el, i) {
    setText($('.word-n', el), String(i + 1));
    setText($('.value', el), words[i]);
  });
  setText($('#reveal-btn'), state.reveal ? 'Hide phrase' : 'Reveal phrase');
  setText($('#copy-seed-btn'), state.seedCopied ? 'Copied' : 'Copy phrase');
  setText($('#restored-alt'), state.rAlt);
  show($('#restored-alt'), !!state.rAlt);
}

function renderEnv() {
  $('#env-banner').innerHTML = state.env.html;
  // The "download and run it locally" prompt is noise once you already are.
  show($('#dl-banner'), location.hostname !== 'localhost');
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

/* ============================================================
   Actions
   ============================================================ */

var DEMO = {
  12: 'legal winner thank year wave sausage worth useful legal winner thank yellow',
  24: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon '
    + 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon '
    + 'abandon art',
  20: 'duckling enlarge academic academic agency result length solution fridge kidney coal piece '
    + 'deal husband erode duke ajar critical decision keyboard'
};

function setCount(n) {
  setState({ count: n, words: fill(n, ''), secret: null, seedFp: '', verifyFp: '', seedErr: '' });
}

function doSplit() {
  if (state.busy || !state.secret) return;
  setState({ busy: true, writeErr: '' });
  // Always an empty SLIP-39 passphrase: that is what keeps the shares
  // restorable on a Trezor, which never asks for one.
  generateShares(state.secret, state.m, state.n, '').then(function (shares) {
    setState({ shares: shares, written: [], busy: false, step: 2, keyLabel: '', revealed: -1 });
  }).catch(function (e) {
    setState({ busy: false, seedErr: e.message });
  });
}

/* Press one: is this key free? A read cannot share a press with the write, so
   this is a step of its own rather than something hidden inside doWrite(). */
function doCheckKey() {
  if (state.busy) return;
  var i = state.written.length;
  if (i >= state.n) return;
  setState({ busy: true, writeErr: '' });
  existingShareOnKey().then(function (found) {
    if (found) {
      setState({
        busy: false, checkedFor: -1,
        writeErr: 'This key already holds share ' + (found.i + 1) + ' of ' + found.n
          + (found.label ? ' ("' + found.label + '")' : '')
          + '. Use a different key, or clear this one with "ykman fido reset" — two shares on '
          + 'one key would weaken the threshold.'
      });
      return;
    }
    setState({ busy: false, checkedFor: i, writeErr: '' });
  }).catch(function (e) {
    setState({ busy: false, writeErr: friendlyAuthError(e).message });
  });
}

/* Press two: create the credential and write the share. These two stay in the
   same press — that pairing is what works. */
function doWrite() {
  if (state.busy) return;
  var i = state.written.length;
  if (i >= state.n) return;
  var label = state.keyLabel.trim() || 'YubiKey ' + (i + 1);
  setState({ busy: true, writeErr: '' });
  writeShareToKey({
    v: RECORD_VERSION, share: state.shares[i], of: originKind(), rp: rpId(),
    n: state.n, m: state.m, i: i, label: label,
    fp: state.seedFp, vfp: state.verifyFp,
    created: new Date().toISOString().slice(0, 10)
  }).then(function () {
    setState({
      written: state.written.concat([{ label: label }]),
      busy: false, keyLabel: '', checkedFor: -1
    });
  }).catch(function (e) {
    setState({ busy: false, writeErr: e.message });
  });
}

function doVerifyRead() {
  if (state.busy) return;
  setState({ busy: true, verifyMsg: '', verifyOk: null });
  readShareFromKey().then(function (rec) {
    if (state.vRecords.some(function (r) { return r.i === rec.i; })) {
      throw new Error('That key has already been read — try a different one.');
    }
    var recs = state.vRecords.concat([rec]);
    if (recs.length < state.m) {
      setState({ vRecords: recs, busy: false });
      return null;
    }
    return combineMnemonics(recs.map(function (r) { return r.share; }), '').then(function (secret) {
      if (bytesToHex(secret) !== bytesToHex(state.secret)) {
        throw new Error('Those keys rebuild a different secret. Do not rely on this backup.');
      }
      setState({
        vRecords: recs, busy: false, verifyOk: true, step: 4,
        verifyMsg: 'Verified — moving on'
      });
    });
  }).catch(function (e) {
    setState({ busy: false, verifyOk: false, verifyMsg: e.message });
  });
}

/* Turn a recovered master secret back into something a wallet accepts. The
   share record says which standard it came from; a pasted share does not, so
   both encodings are offered. */
function presentSecret(secret, of, recordedFp) {
  if (of === 'bip39-128' || of === 'bip39-256') {
    return bip39FromEntropy(secret).then(function (phrase) {
      return {
        text: phrase, kind: 'BIP-39 · ' + phrase.split(' ').length + ' words',
        fp: recordedFp, alt: ''
      };
    });
  }
  return generateShares(secret, 1, 1, '').then(function (one) {
    var out = {
      text: one[0], kind: 'SLIP-39 · ' + one[0].split(' ').length + ' words',
      fp: recordedFp, alt: ''
    };
    if (of) return out;
    // Pasted shares carry no origin marker, so say what the other reading is.
    return bip39FromEntropy(secret).then(function (phrase) {
      out.kind = 'SLIP-39 · ' + one[0].split(' ').length + ' words (origin not recorded)';
      out.alt = 'If this backup was made from a BIP-39 phrase, the same bytes are: ' + phrase;
      return out;
    }, function () { return out; });
  });
}

function finishRestore(mnemonics, of, recordedFp, recordedVfp) {
  var recovered;
  return combineMnemonics(mnemonics, '').then(function (secret) {
    recovered = secret;
    // For a threshold of 1 there is no digest share, so nothing in SLIP-39
    // itself would notice a corrupted share — this comparison is the only
    // thing standing between the user and a silently wrong wallet.
    if (!recordedVfp) return null;
    return verificationFingerprint(secret, of).then(function (f) {
      if (f !== recordedVfp) {
        throw new Error('These shares rebuild a different wallet than the one that was backed '
          + 'up — got ' + f + ', the keys record ' + recordedVfp + '. Do not use this result.');
      }
      return true;
    });
  }).then(function (checked) {
    return presentSecret(recovered, of, recordedFp).then(function (r) {
      if (checked) r.kind += ' · fingerprint verified';
      return r;
    });
  }).then(function (r) {
    // A pasted share carries no record, so derive something to show.
    if (r.fp) return r;
    return verificationFingerprint(recovered, of).then(function (f) { r.fp = f; return r; });
  }).then(function (r) {
    setState({
      rSeed: r.text, rKind: r.kind, rFp: r.fp, rAlt: r.alt,
      busy: false, step: 1, reveal: false, readErr: ''
    });
  });
}

function doRestoreRead() {
  if (state.busy) return;
  setState({ busy: true, readErr: '' });
  readShareFromKey().then(function (rec) {
    if (state.rRecords.some(function (r) { return r.i === rec.i; })) {
      throw new Error('That key has already been read — try a different one.');
    }
    // Catch a key from a different backup here, where we can name the
    // problem, rather than letting it surface as a checksum failure later.
    var first = state.rRecords[0];
    if (first && (rec.fp !== first.fp || rec.n !== first.n || rec.m !== first.m)) {
      throw new Error('That key belongs to a different backup (' + rec.fp + ', not '
        + first.fp + ').');
    }
    var recs = state.rRecords.concat([rec]);
    if (recs.length < recs[0].m) {
      setState({ rRecords: recs, busy: false });
      return null;
    }
    setState({ rRecords: recs });
    return finishRestore(recs.map(function (r) { return r.share; }),
      recs[0].of, recs[0].fp, recs[0].vfp);
  }).catch(function (e) {
    setState({ busy: false, readErr: e.message });
  });
}

function doPasteCombine() {
  var list = state.pasted.map(function (t) { return (t || '').trim(); }).filter(Boolean);
  if (!list.length) return;
  setState({ busy: true, readErr: '' });
  // No record, so no origin and nothing to verify against.
  finishRestore(list, null, '', '').catch(function (e) {
    setState({ busy: false, readErr: e.message });
  });
}

function wipe() {
  enrolledIds = [];
  pendingCred = null;
  setState({
    view: 'home', step: 0, count: 12, words: fill(12, ''), inputPass: '',
    secret: null, seedFp: '', verifyFp: '', seedErr: '', n: 5, m: 3, shares: [],
    written: [], keyLabel: '', busy: false, writeErr: '', revealed: -1, checkedFor: -1,
    vRecords: [], verifyMsg: '', verifyOk: null,
    rRecords: [], readErr: '', pasteMode: false, pasted: ['', '', ''],
    rSeed: '', rFp: '', rKind: '', rAlt: '', reveal: false, seedCopied: false
  });
}

var CLICKS = {
  home: function () { setState({ view: 'home' }); },
  theme: function () { setState({ dark: !state.dark }); },
  backup: function () { setState({ view: 'backup', step: 0 }); },
  restore: function () { setState({ view: 'restore', step: 0 }); },
  back: function () { setState({ step: Math.max(0, state.step - 1) }); },
  count12: function () { setCount(12); },
  count20: function () { setCount(20); },
  count24: function () { setCount(24); },
  demo: function () { setState({ words: DEMO[state.count].split(' ') }); refreshSeed(); },
  'seed-next': function () { if (state.secret) setState({ step: 1 }); },
  'split-next': doSplit,
  'check-key': doCheckKey,
  'write-key': doWrite,
  'reveal-share': function (i) { setState({ revealed: state.revealed === i ? -1 : i }); },
  'to-verify': function () {
    setState({ step: 3, vRecords: [], verifyMsg: '', verifyOk: null });
  },
  'verify-read': doVerifyRead,
  'read-key': doRestoreRead,
  'toggle-paste': function () { setState({ pasteMode: !state.pasteMode }); },
  'paste-more': function () { setState({ pasted: state.pasted.concat(['']) }); },
  'paste-combine': doPasteCombine,
  wipe: wipe,
  reveal: function () { setState({ reveal: !state.reveal }); },
  'copy-seed': function () {
    copyText(state.rSeed).then(function (ok) {
      setState({ seedCopied: ok });
      setTimeout(function () { setState({ seedCopied: false }); }, 1400);
    });
  }
};

var INPUTS = {
  word: function (i, v) {
    var w = state.words.slice();
    w[i] = v;
    setState({ words: w });
    refreshSeed();
  },
  inputpass: function (i, v) { setState({ inputPass: v }); refreshSeed(); },
  n: function (i, v) {
    var n = +v;
    setState({ n: n, m: Math.min(state.m, n) });
  },
  m: function (i, v) { setState({ m: Math.min(+v, state.n) }); },
  keylabel: function (i, v) { setState({ keyLabel: v }); },
  pasteshare: function (i, v) {
    var p = state.pasted.slice();
    p[i] = v;
    setState({ pasted: p, readErr: '' });
  }
};

/* ============================================================
   Wiring
   ============================================================ */

function indexOf(el) {
  var row = el.closest('[data-i]');
  return row ? +row.dataset.i : -1;
}

document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-act]');
  if (!t || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
  var fn = CLICKS[t.dataset.act];
  if (!fn) return;
  if (t.tagName === 'A') e.preventDefault();
  fn(indexOf(t));
});

document.addEventListener('input', function (e) {
  var t = e.target.closest('[data-act]');
  if (!t) return;
  var fn = INPUTS[t.dataset.act];
  if (fn) fn(indexOf(t), t.value);
});

// A pasted phrase fills the whole grid and picks the word count for you.
document.addEventListener('paste', function (e) {
  var t = e.target.closest('[data-act="word"]');
  if (!t) return;
  var text = (e.clipboardData || window.clipboardData).getData('text') || '';
  var parts = text.trim().toLowerCase().split(/[\s,]+/).filter(Boolean);
  if (parts.length < 2) return;
  e.preventDefault();
  // Only the three supported lengths; anything else keeps the current grid so
  // the user sees their words rather than a silently truncated phrase.
  var count = parts.length === 12 || parts.length === 20 || parts.length === 24
    ? parts.length : state.count;
  var w = fill(count, '');
  parts.slice(0, count).forEach(function (p, k) { w[k] = p; });
  t.blur();
  setState({ count: count, words: w });
  refreshSeed();
});

render();
