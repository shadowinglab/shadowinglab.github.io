window.COURSE = window.COURSE || { core: [], biz: [], mods: [] };
COURSE.mods.push(
  { id: "b1", track: "biz", name: "Starting a meeting", units: ["B1", "B2", "B3"] },
  { id: "b2", track: "biz", name: "Discussing and deciding", units: ["B4", "B5", "B6"] },
  { id: "b3", track: "biz", name: "Numbers, calls and closing", units: ["B7", "B8", "B9"] }
);
COURSE.biz.push(
{id:"B1",lvl:"A2",me:"Karim",topic:"Meetings",title:"Introductions around the table",g:"Talking about your role",
rows:[["I'm the + job title + at + company","I'm the contracts manager at Delta Fit-Out."],["I work for + company · I work on + project","I work for the client. I work on the hotel project."],["responsible for / in charge of + noun or -ing","I'm responsible for contracts and prices."],["Present simple for permanent roles","I deal with the schedule and the budget."]],
checks:["I'm responsible ___ the budget.|of,for,in|1","She ___ in charge of the design team.|is,does,has|0","I work ___ a construction company.|for,in charge,at the|0"],
text:`My first meeting with a new client is always important. People decide very quickly if they can trust you, so I prepare a short introduction before I go. I say my name, my job title and my company, and then I explain what I'm responsible for. For example: "I'm the contracts manager at Delta Fit-Out. I'm responsible for contracts, prices and subcontractors." It's short and clear.
At the start of most meetings, the chair asks us to go around the table. Everyone introduces themselves, one by one. I listen carefully, because I need to know who is in charge of what. Who deals with the budget and the schedule? Who looks after the design? Who signs the payments? If I don't catch a name, I ask the person to spell it. Nobody minds.
After the meeting, I give my business card to the people I will work with. It's a simple thing, but it helps. Next time they have a question about the contract, they know who to call. It's always good to put names to faces.`,
dlg:`Mark: Good morning. I'm Mark Wells. I work for the client, and I'm in charge of the design team.
Karim: Nice to meet you, Mark. I'm Karim Hassan, the contracts manager at Delta Fit-Out.
Mark: Nice to meet you too. What exactly are you responsible for on this project?
Karim: I'm responsible for the contract, the prices and our subcontractors. I also deal with variations and payments.
Mark: Great. So if we have a question about the budget, we call you?
Karim: Exactly. And for anything on site, you can call Ali, our site engineer. He looks after the work every day.
Mark: Perfect. Sorry, how do you spell your surname?
Karim: It's H-A-S-S-A-N. Here's my business card.
Mark: Thanks. It's good to put names to faces.
Karim: It is. I'm looking forward to working with you.`,
v:["go around the table|phrase|each person speaks in turn|نلف على الكل|Let's go around the table and introduce ourselves.","introduce yourself|phrase|say who you are|يعرّف بنفسه|Could you introduce yourself, please?","responsible for|phrase|it is your job to deal with it|مسؤول عن|I'm responsible for the budget.","in charge of|phrase|managing and controlling something|مسؤول عن / ماسك|Who is in charge of procurement?","work for|phrase|be employed by a company|يشتغل في (شركة)|I work for a fit-out company.","look after|phrasal verb|take care of|يتابع / يهتم بـ|Ali looks after the work on site.","deal with|phrasal verb|handle a task or problem|يتعامل مع|I deal with suppliers every day.","schedule|noun|a plan of when things will happen|الجدول الزمني|We're behind schedule.","budget|noun|the money available for something|الميزانية|We need to stay within budget.","spell|verb|say the letters of a word|يتهجى|Could you spell that, please?","business card|noun|a small card with your name and contact details|كارت شخصي|Here's my business card.","put names to faces|phrase|meet people you only knew by name|نتعرف وش لوش|It's nice to put names to faces."],
p:["Introduce yourself as you would at the start of a meeting.","Explain what you are responsible for in your job.","Introduce a colleague to a new client.","What do you say when you didn't hear someone's name? Practise it."]},

{id:"B2",lvl:"A2",me:"Karim",topic:"Meetings",title:"Opening the meeting and the agenda",g:"Let's · I'd like to · ordering ideas",
rows:[["Let's + verb to start or move","Let's get started. Let's move on."],["Ordering: first, next, then, finally","First, the site update. Next, the samples."],["I'd like to + verb (polite)","I'd like to discuss the variation."],["Can I…? to ask for permission","Can I add one point?"]],
checks:["___ get started.|Let,Let's,Lets to|1","I'd like ___ a point.|add,to add,adding|1","___, we'll look at the payments. (the last item)|First,Finally,Next|1"],
text:`Last month, my manager asked me to chair our weekly coordination meeting for the first time. I was nervous, so I prepared the opening carefully.
A good opening is short. First, I thank everyone for coming. Then I give the aim of the meeting in one sentence, for example: "The aim of today's meeting is to review the schedule." After that, I go through the agenda. I usually have three or four items, and I say them in order: first, next, then, finally.
Before we start, I ask if anyone wants to add a point. If someone can't come, I tell the group that they send their apologies. Small topics go at the end, under any other business.
During the meeting, I try to keep time. When we finish one item, I say, "Let's move on to the next item," and I hand over to the right person: "Ali, over to you." My meetings are now shorter, and people are happier. Nobody likes a meeting with no plan.`,
dlg:`Karim: OK, let's get started. Thank you all for coming.
Nadia: Morning, Karim. How long is the meeting today?
Karim: One hour. The aim of today's meeting is to agree the ceiling material.
Nadia: Great. What's on the agenda?
Karim: Three items. First, the site update. Next, the ceiling samples. Finally, the payment schedule.
Nadia: Can I add a point? I'd like to discuss the reception desk drawings.
Karim: Sure. Let's add it at the end, under any other business.
Nadia: Thanks. Is Mona joining us?
Karim: No, she sends her apologies. She's on another site today.
Nadia: OK. I'm ready when you are.
Karim: Right. Let's move on to the first item. Ali, over to you.`,
v:["let's get started|phrase|let's begin|يلا نبدأ|OK, let's get started.","thank you all for coming|phrase|a polite way to open a meeting|شكراً لحضوركم|Thank you all for coming today.","aim|noun|the purpose, what you want to achieve|الهدف|The aim of this meeting is to agree the price.","agenda|noun|the list of topics for a meeting|جدول الأعمال|Let's look at the agenda.","item|noun|one topic on a list|بند|The next item is the budget.","finally|adverb|last in a list|وأخيراً|Finally, let's talk about dates.","add a point|phrase|include another topic|أضيف نقطة|Can I add a point?","discuss|verb|talk about something in detail|يناقش|We need to discuss the variation.","any other business|phrase|the last part of a meeting for extra topics (AOB)|أي موضوعات أخرى|Is there any other business?","apologies|noun|a polite message that you can't attend|اعتذار عن الحضور|Mona sends her apologies.","move on to|phrasal verb|go to the next topic|ننتقل لـ|Let's move on to the next item.","over to you|phrase|now it's your turn to speak|اتفضل الكلمة لك|Ali, over to you."],
p:["Open a meeting: greet people, give the aim and the agenda.","Ask to add a point to the agenda.","Tell the group that a colleague can't come.","Move the meeting to the next item and hand over to a colleague."]},

{id:"B3",lvl:"A2",me:"Karim",topic:"Meetings",title:"Giving a progress update",g:"Present perfect + present continuous for updates",
rows:[["Present perfect: work finished (no exact time)","We've finished the partitions."],["Present continuous: work in progress","The team is working on the first floor."],["already / just / yet","We haven't started yet. We've just received the samples."],["Past simple with a time","The tiles arrived yesterday."]],
checks:["We ___ the ceiling last week.|have finished,finished,finishing|1","The team ___ on the first floor now.|works,is working,has worked|1","We haven't received the samples ___.|already,just,yet|2"],
text:`Every Sunday, I give the client a short update about the site. I learned that a good update answers three questions. What have we finished? What are we working on now? What is the next step?
For finished work, I use the present perfect: "We've finished the partitions on the ground floor." For work in progress, I use the present continuous: "The team is working on the first floor." If something happened at a clear time, I use the past simple: "The tiles arrived yesterday."
Clients always want to know one thing: are we on schedule? I try to be honest. If we're behind, I say how many days and what we're doing to catch up, for example, adding a second shift.
I also use already and yet a lot. "The electricians have already finished the first fix, but we haven't started the ceilings yet." These two small words make my updates much clearer. At the end, I always ask, "Anything else?" so nobody leaves with a question.`,
dlg:`Mark: Hi Karim. So, what's the latest from the site?
Karim: Here's the update. We've finished the gypsum partitions on the ground floor. The team is now working on the first floor.
Mark: And the electrical work?
Karim: The electricians have already finished the first fix. They're waiting for the ceiling to close before the second fix.
Mark: What about the flooring?
Karim: The tiles arrived yesterday, but we haven't started the installation yet. The screed is still drying.
Mark: Are we on schedule?
Karim: More or less. We're three days behind on the first floor, but we're catching up. We've added a second shift.
Mark: Good. Anything else?
Karim: Yes. We've just received the samples for the wall cladding. They're in the site office.
Mark: Great. I'll check them after lunch.`,
v:["here's the update|phrase|this is the latest news|ده آخر تحديث|So, here's the update from the site.","working on|phrase|busy doing a task now|شغّالين على|We're working on the second floor.","already|adverb|before now, sooner than expected|خلاص / بالفعل|We've already sent the drawings.","wait for|phrasal verb|stay until something happens|يستنى|We're waiting for approval.","installation|noun|putting something in place|التركيب|The installation starts on Sunday.","still|adverb|continuing until now|لسه|The paint is still wet.","on schedule|phrase|at the planned time|في الميعاد|The project is on schedule.","behind|adverb|later than planned|متأخر|We're two days behind.","catch up|phrasal verb|reach the planned point after being late|نعوّض التأخير|We're working Saturdays to catch up.","shift|noun|a period of work time for a team|وردية|We added a night shift.","sample|noun|a small piece to show what something is like|عينة|Please approve the sample.","anything else?|phrase|asking if there is more|فيه حاجة تانية؟|Good. Anything else?"],
p:["Give a progress update on a project you're working on.","What have you finished this week, and what are you working on now?","Is your project on schedule? Explain why or why not.","What haven't you done yet that you need to do?"]},

{id:"B4",lvl:"A2",me:"Karim",topic:"Meetings",title:"Opinions: agreeing and disagreeing",g:"Giving opinions politely",
rows:[["Giving opinions: I think… · In my opinion…","In my opinion, the metal ceiling looks more modern."],["Agreeing: I agree with… · Exactly. · That's true.","I agree with you about maintenance."],["Polite disagreement: I see your point, but… · I'm afraid I don't agree.","I see your point, but it's expensive."],["Asking: What do you think? · How do you feel about…?","Ali, what do you think?"]],
checks:["I agree ___ you.|to,with,on|1","I see your point, ___ I'm not sure.|so,but,because|1","___ my opinion, it's too expensive.|On,In,For|1"],
text:`In meetings, people often disagree, and that's normal. The important thing is how you disagree. In my first years, I said "No, that's wrong" too quickly, and people felt attacked. Now I'm more careful.
When I give my opinion, I start with "I think" or "In my opinion". It sounds softer. When someone has a good idea, I agree clearly: "I agree with you," or simply, "Exactly."
When I don't agree, I first show that I listened: "I see your point, but…" Then I give a reason, usually about cost, time or quality. For example: "I see your point, but the lead time is eight weeks, and that's too long for us." If I really can't accept something, I say, "I'm afraid I don't agree," and I explain why.
I also ask quiet people for their opinion: "What do you think, Ali?" Sometimes the best idea comes from the person who says nothing. A good discussion is not a fight. It's a way to find the best choice together.`,
dlg:`Mark: Let's talk about the lobby ceiling. In my opinion, the metal ceiling looks more modern.
Karim: I see your point, but I'm not sure it's right for the budget. It's about thirty percent more expensive than gypsum.
Mark: That's true. But it's easier to maintain, and it lasts longer.
Karim: I agree with you about maintenance. The problem is the lead time. The supplier needs eight weeks.
Mark: Eight weeks? That's too long.
Karim: Exactly. What do you think about gypsum in the lobby and metal only in the corridors?
Mark: Hmm, I'm afraid I don't agree. The lobby is the first thing visitors see.
Karim: That's a fair point. Let me ask a second supplier for a shorter delivery time.
Mark: Good idea. Can you send me their price by Thursday?
Karim: Of course. I'll try to send it on Wednesday.`,
v:["what do you think|phrase|asking for an opinion|إيه رأيك|What do you think about the design?","in my opinion|phrase|I think|في رأيي|In my opinion, we should wait.","choice|noun|an option you can choose|اختيار|Gypsum is the cheaper choice.","I see your point|phrase|I understand your idea (before disagreeing)|فاهم وجهة نظرك|I see your point, but the cost is high.","I'm not sure|phrase|I have doubts|مش متأكد|I'm not sure that's a good idea.","maintain|verb|keep something in good condition|يعمل صيانة|Metal ceilings are easy to maintain.","I agree with|phrase|I have the same opinion as|أنا متفق مع|I agree with Sarah.","lead time|noun|time between ordering and delivery|مدة التوريد|The lead time is six weeks.","supplier|noun|a company that sells materials or goods|مورّد|We need a second supplier.","exactly|adverb|used to strongly agree|بالظبط|Exactly. That's my point.","I'm afraid|phrase|a polite way to say something negative|للأسف|I'm afraid I don't agree.","delivery time|noun|how long it takes to deliver|ميعاد التسليم|What's the delivery time?"],
p:["Give your opinion on a decision at work and explain why.","Politely disagree with this: \"We should always choose the cheapest supplier.\"","Agree with a colleague and add one more reason.","Ask a quiet colleague for their opinion in a meeting."]},

{id:"B5",lvl:"A2",me:"Karim",topic:"Meetings",title:"Explaining problems and delays",g:"Past simple + softening bad news",
rows:[["Past simple: what happened","The factory delivered the wrong marble."],["because / so / that's why","There was a mistake, so the desk will be late."],["Softening: I'm afraid… · Unfortunately…","Unfortunately, the desk will be ten days late."],["instead of + noun","white marble instead of grey"]],
checks:["The supplier ___ the wrong material last week.|sends,sent,sending|1","___, the delivery will be late.|Unfortunately,Fortunately,Luckily|0","They sent white ___ grey.|instead,instead of,instead to|1"],
text:`Nobody likes giving bad news, but in construction it happens every week. A delivery is late, a supplier sends the wrong material, or a drawing has a mistake. What matters is how you explain it.
I follow three steps. First, I say what happened, clearly and in the past simple: "The factory delivered the wrong marble last week." I don't hide the problem, and I don't blame people in front of the client.
Second, I explain the effect. I use words like "unfortunately" and "I'm afraid" to soften the news: "Unfortunately, the desk will be about ten days late."
Third, and most important, I offer a way to reduce the delay. For example, we can install the base first and fix the top later. That way, the other trades can continue.
At the end, I apologise once, not ten times: "I'm sorry for the trouble." Then I promise to put everything in writing. Clients are not angry about problems. They're angry when they hear about them too late.`,
dlg:`Mark: Karim, I got your email about the reception desk. What happened?
Karim: I'm afraid we have a problem. The factory delivered the wrong marble last week.
Mark: Oh no. How did that happen?
Karim: There was a mistake in the order. They sent white marble instead of grey.
Mark: So what does that mean for the schedule?
Karim: Unfortunately, the desk will be about ten days late. The factory needs time to order new marble.
Mark: Is there anything we can do to reduce the delay?
Karim: Yes. We can install the base first and fix the top later. That way, the painters and the flooring team can continue.
Mark: OK. I'm not happy about it, but I understand. Please put it in writing.
Karim: Of course. I'll send a revised programme today. And I'm sorry for the trouble.`,
v:["what happened?|phrase|asking about a problem|إيه اللي حصل؟|The site stopped. What happened?","deliver|verb|bring goods to a place|يورّد / يسلّم|They delivered the tiles today.","wrong|adjective|not correct|غلط|They sent the wrong colour.","mistake|noun|something done wrong|غلطة|There was a mistake in the order.","instead of|phrase|in place of|بدل|grey instead of white","unfortunately|adverb|sadly, it's bad news|للأسف|Unfortunately, we're late.","late|adjective|after the planned time|متأخر|The delivery is late.","reduce|verb|make smaller or less|يقلّل|We need to reduce the cost.","delay|noun|when something happens later than planned|تأخير|Sorry for the delay.","that way|phrase|by doing this|بكده / بالطريقة دي|We start early. That way, we finish on time.","put it in writing|phrase|send it officially in writing|ابعتها مكتوبة|Please put it in writing.","sorry for the trouble|phrase|apologising for a problem you caused|آسف على الإزعاج|I'm sorry for the trouble."],
p:["Explain a problem you had at work and what caused it.","Tell a client about a delay politely.","Suggest one way to reduce a delay.","Apologise for a mistake and say what you will do next."]},

{id:"B6",lvl:"A2",me:"Karim",topic:"Meetings",title:"Suggestions and decisions",g:"Why don't we · How about · could · will for decisions",
rows:[["Why don't we + verb? · Let's + verb","Why don't we ask for a mock-up?"],["How about / What about + -ing or noun","How about putting it in the lobby?"],["We could / You should + verb","We could ask a second supplier."],["will for decisions made now","I'll call the supplier this afternoon."]],
checks:["How about ___ a second supplier?|ask,asking,to ask|1","Why don't we ___ a mock-up?|getting,get,to get|1","OK, I ___ send the price today. (decision now)|am,will,going|1"],
text:`A meeting without a decision is a waste of time. That's why I always try to finish with a clear "who does what, and by when".
When there's a problem, I ask for ideas: "Any suggestions?" Then I suggest something myself. There are many ways to do it. "Why don't we ask the supplier for a mock-up?" "How about putting the mock-up in the lobby?" "We could ask a second supplier." When I want to sound more formal, I say, "I suggest we keep the metal ceiling only in the main area."
When people like an idea, they say, "That's a good idea," or "Let's go with that." This is the moment to decide. I repeat the decision so everyone hears it: "OK, so we've decided. Ali will arrange the mock-up by Tuesday."
When I offer to do something, I use will: "I'll call the supplier this afternoon." It's short, and it's a promise. A good solution is not enough if nobody takes action. The decision is only real when someone says, "I'll do it."`,
dlg:`Sarah: So, we need a solution for the lobby ceiling. Any suggestions?
Karim: Why don't we ask the supplier for a mock-up? Then the client can see the real material.
Sarah: That's a good idea. How about putting it in the lobby itself?
Karim: Yes, the light there is different. We could also ask a second supplier for a price.
Sarah: Good. What about the cost?
Karim: I suggest we keep the metal ceiling only in the main area. That will save about fifteen percent.
Sarah: I like that. Let's go with your suggestion.
Karim: Great. I'll arrange the mock-up by next Tuesday, and I'll call the second supplier this afternoon.
Sarah: Perfect. Let's make the final decision at next week's meeting.`,
v:["solution|noun|an answer to a problem|حل|We need a quick solution.","any suggestions?|phrase|asking people for ideas|حد عنده اقتراح؟|We're late. Any suggestions?","why don't we|phrase|used to suggest something|ما تيجوا|Why don't we meet on site?","mock-up|noun|a full-size sample to show the final look|موك أب / نموذج|The client approved the mock-up.","that's a good idea|phrase|agreeing with a suggestion|فكرة حلوة|That's a good idea. Let's do it.","how about|phrase|used to suggest something|إيه رأيك لو|How about Monday?","we could|phrase|a soft suggestion|ممكن|We could use a different material.","I suggest|phrase|I propose|أقترح|I suggest we wait for the price.","save|verb|spend less money or time|يوفّر|This will save two weeks.","let's go with|phrase|let's choose|يلا نمشي بـ|Let's go with option B.","decide|verb|make a choice|يقرّر|We decided to use gypsum.","arrange|verb|organise something|يرتّب / ينظّم|Can you arrange a site visit?"],
p:["Suggest a solution for a problem in your team.","Respond to a colleague's suggestion: agree and add an idea.","Summarise a decision and say who will do what.","Offer to do a task using I'll."]},

{id:"B7",lvl:"A2+",me:"Karim",topic:"Meetings",title:"Numbers, payments and deadlines",g:"Saying numbers, dates and comparisons",
rows:[["Big numbers","4,200,000 = four million, two hundred thousand"],["Decimals and percentages","1.5 = one point five · 36% = thirty-six percent"],["Dates","the fifteenth of November · November the fifteenth"],["Comparing numbers","higher than expected · twice as much as September"]],
checks:["The invoice is due ___ the fifteenth of November.|in,on,at|1","October was our ___ month.|busy,busier,busiest|2","1.5 million is said: one ___ five million.|dot,point,comma|1"],
text:`Numbers are the part of meetings that scares many people. You need to say them quickly and correctly, because a small mistake can cost a lot of money. I learned this the hard way, when I said "fifteen" and the client heard "fifty".
Now I practise the numbers before every payment meeting. Big numbers have a pattern: 4,200,000 is "four million, two hundred thousand". For decimals, we say "point", so 1.5 is "one point five". For percentages, we say "percent". With dates, I prefer "the fifteenth of November", because it's clear to everyone.
I also use simple phrases to talk about money. "So far, you've paid one point five million." "The next invoice is due on the fifteenth." "It covers the work we finished in October." When I'm not sure of a number, I say "roughly" and promise to send the exact figure later.
Finally, I compare numbers to tell the story behind them: "This month's invoice is higher than last month's, because October was our busiest month." A breakdown by item helps the client see where the money goes. Numbers alone are boring. Numbers with a reason are convincing, and they help you meet the deadline for payment.`,
dlg:`Mark: Can we look at the payment schedule? What's the contract value again?
Karim: Four million, two hundred thousand pounds.
Mark: And how much have we paid so far?
Karim: So far, you've paid one point five million. That's about thirty-six percent.
Mark: When is the next payment due?
Karim: The next invoice is due on the fifteenth of November. It covers the work we finished in October.
Mark: How much is it?
Karim: Roughly six hundred and fifty thousand. I'll send you the exact figure with the invoice.
Mark: That's higher than I expected.
Karim: Yes, because October was our busiest month. We installed more than twice as much as in September.
Mark: OK. Can you send me a breakdown by item?
Karim: Of course. You'll have it by Thursday.
Mark: And the final deadline is still the thirtieth of March?
Karim: That's right, if we get the approvals on time.`,
v:["payment|noun|money you pay|دفعة|The first payment is due next week.","contract value|noun|the total price in a contract|قيمة العقد|The contract value is two million.","so far|phrase|until now|لحد دلوقتي|So far, we've paid thirty percent.","percent|noun|out of a hundred (%)|في المية|Ten percent is a lot.","due|adjective|expected or needed at a certain time|مستحق|The report is due on Friday.","invoice|noun|a document asking for payment|فاتورة / مستخلص|Please send the invoice by email.","cover|verb|include|يغطي|The price covers delivery.","roughly|adverb|about, not exactly|تقريباً|It costs roughly a million.","exact figure|phrase|the correct, precise number|الرقم بالظبط|I'll send you the exact figure.","higher than|phrase|more than|أعلى من|The cost is higher than last year.","breakdown|noun|details showing all the parts of a total|تفصيل / تحليل|Send me a cost breakdown.","deadline|noun|the last date to finish something|آخر ميعاد|The deadline is next Thursday."],
p:["Say these aloud: 3,750,000 · 12.5% · 21 November.","Explain a budget or price from your work.","Compare this month's work with last month.","Tell a client when a payment or deadline is due."]},

{id:"B8",lvl:"A2+",me:"Karim",topic:"Meetings",title:"Online calls and checking understanding",g:"Can / could for requests · checking",
rows:[["Can / Could you + verb? for requests","Could you repeat that, please?"],["Checking: Do you mean…? · Just to check…","Just to check, do you mean all the rooms?"],["Can I / Could I…? for permission","Could I share my screen?"],["Sorry, … to interrupt or apologise","Sorry, I think you're on mute."]],
checks:["Could you ___ that, please?|repeating,repeat,to repeat|1","Sorry, I think you're ___ mute.|in,at,on|2","Just to check, do you ___ the second floor?|mean,say,talk|0"],
text:`Half of my meetings are now online, with consultants in Dubai and clients who work from home. Online meetings are faster, but they bring their own problems: a bad connection, a frozen screen, or someone who talks for two minutes while they're on mute.
I start every call the same way: "Hi everyone, can you hear me?" Then I wait for an answer. If someone's video is frozen or their connection is bad, I say it kindly, without making them feel embarrassed.
The biggest challenge is understanding. On a call, it's easy to miss a word, especially with different accents. In the past, I was shy and I didn't ask. Now I say, "Sorry, I missed that. Could you repeat the last part, please?" Nobody minds. To make sure I understood correctly, I check: "Just to check, do you mean all the meeting rooms, or only the big one?" Sometimes I ask for a colour code or a number by email, so it's clear.
When I need to show a drawing, I ask, "Can I share my screen?" When I finish, I stop sharing. If I'm not sure everyone can see it, I ask. A short check now saves a long mistake later.`,
dlg:`Sarah: Hi Karim. Can you hear me?
Karim: Yes, I can hear you, but your video is frozen.
Sarah: Sorry, my connection is bad today. Is it better now?
Karim: Yes, much better. Sorry, I missed the start. Could you repeat the last part, please?
Sarah: Sure. I said the client wants to change the carpet colour in the meeting rooms.
Karim: Just to check, do you mean all the meeting rooms, or only the big one on the second floor?
Sarah: All of them, I'm afraid.
Karim: OK. Could you send me the new colour code by email? I want to make sure we order the right one.
Sarah: No problem. I'll share my screen now so you can see it.
Karim: Sorry, Sarah, I think you're on mute.
Sarah: Oh, sorry! Can you see it now?
Karim: Yes, I can see it. Thanks, that's clear.`,
v:["can you hear me|phrase|checking your sound works|سامعني؟|Hello? Can you hear me?","frozen|adjective|not moving (video)|واقف / مهنّج|Your screen is frozen.","connection|noun|the internet link|الاتصال / النت|My connection is slow.","I missed that|phrase|I didn't hear or understand that|ماسمعتش / فاتني|Sorry, I missed that.","could you repeat|phrase|a polite request to say it again|ممكن تعيد|Could you repeat the number?","just to check|phrase|I want to be sure I understood|بس عشان أتأكد|Just to check, is it Thursday?","do you mean|phrase|asking for the exact meaning|قصدك|Do you mean the first floor?","make sure|phrase|check that something is correct|أتأكد|Make sure the price includes VAT.","share my screen|phrase|show my computer screen to others|أشارك الشاشة|Let me share my screen.","on mute|phrase|your microphone is off|قافل المايك|You're on mute.","colour code|noun|the number that identifies a colour|كود اللون|What's the colour code?","that's clear|phrase|I understand now|كده واضح|Thanks, that's clear."],
p:["Start an online meeting and check everyone can hear you.","Ask someone to repeat or explain something.","Check that you understood an instruction correctly.","Tell a colleague politely that they are on mute."]},

{id:"B9",lvl:"A2+",me:"Karim",topic:"Meetings",title:"Closing the meeting and action points",g:"going to · will · need to · by + deadline",
rows:[["going to: plans already agreed","Ali is going to arrange the mock-up."],["will: promises and offers","I'll send the minutes this afternoon."],["need + noun · need to + verb","We need the final approval by the end of the month."],["by + deadline","by Thursday · by the end of the month"]],
checks:["I'll send the report ___ Friday. (deadline)|until,by,on to|1","We need ___ the approval soon.|get,to get,getting|1","OK, I ___ talk to the client on Monday. (promise)|'ll,'m,'d|0"],
text:`The last five minutes of a meeting are the most important, but many people waste them. Everyone is tired, someone is looking at their phone, and the meeting ends without a clear plan. I learned to protect those five minutes.
When we're almost out of time, I say, "Let me summarise what we agreed." Then I go through the action points one by one. Each point has three parts: who, what and by when. "Ali is going to arrange the mock-up by Tuesday. I'll send the revised programme by Thursday." I use going to for things we've already agreed, and will for new promises.
Next, I ask about any other business. Sometimes the most important problem comes up at this moment, so I never skip it. If something is urgent, I make it clear: "We need the final approval by the end of the month. Otherwise, the factory can't start."
Finally, I confirm the next meeting, often on site, and thank people for their time. The same afternoon, I send the minutes. If something isn't written down, people will remember it differently next week.`,
dlg:`Karim: OK, we're almost out of time. Let me summarise what we agreed.
Mark: Go ahead.
Karim: First, Ali is going to arrange the ceiling mock-up by next Tuesday. Second, I'll send the second price and the revised programme by Thursday.
Mark: And I'll confirm the carpet colour by email today.
Karim: Perfect. Is there any other business?
Mark: Not from me. Anything from your side?
Karim: Just one thing. We need the final approval for the reception desk by the end of the month. Otherwise, the factory can't start.
Mark: Understood. I'll talk to the client on Monday.
Karim: Great. I'll send the minutes this afternoon. Shall we meet on site next Wednesday at ten?
Mark: Yes. That way we can see the mock-up together.
Karim: Thank you for your time, Mark. Have a good day.`,
v:["out of time|phrase|no more time left|الوقت خلص|Sorry, we're out of time.","summarise|verb|give the main points briefly|يلخّص|Let me summarise the main points.","agree|verb|decide together|يتفق|We agreed to meet on Wednesday.","revised|adjective|changed and updated|معدّل|Here's the revised drawing.","confirm|verb|say that something is definite|يأكّد|Please confirm the date.","otherwise|adverb|if not|وإلا|Send it today. Otherwise, we'll be late.","approval|noun|official permission or agreement|اعتماد / موافقة|We're waiting for approval.","understood|phrase|I understand and accept|مفهوم|Understood. I'll do it.","minutes|noun|the written record of a meeting|محضر الاجتماع|Who's taking the minutes?","on site|phrase|at the place where the work is done|في الموقع|Let's meet on site.","by|preposition|not later than|قبل / في موعد أقصاه|Please send it by Thursday.","thank you for your time|phrase|a polite way to end a meeting|شكراً على وقتكم|Thank you for your time."],
p:["Summarise the action points of a meeting: who does what and by when.","Close a meeting politely and confirm the next date.","Promise to do three things after a meeting.","Say a short follow-up email to a client after a meeting."]}
);
