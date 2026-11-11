window.COURSE = window.COURSE || { core: [], biz: [], mods: [] };
COURSE.mods.push(
  { id: "b4", track: "biz", name: "Commercial meetings", units: ["B10", "B11", "B12"] },
  { id: "b5", track: "biz", name: "On site and handover", units: ["B13", "B14", "B15"] },
  { id: "b6", track: "biz", name: "Tenders, suppliers and reports", units: ["B16", "B17", "B18"] }
);
COURSE.biz.push(
{id:"B10",lvl:"A2+",me:"Karim",topic:"Commercial",title:"Discussing a variation",g:"First conditional for cost and time impact",
rows:[["If + present, will + verb: cost and time impact","If we move the wall, we will need to change the ceiling."],["Compare two cases","If you approve it this week, the delay will be small. If it comes late, it will be longer."],["can't / have to for limits","We can't start without a written instruction."],["I'll + verb for promises","I'll send a quotation by Wednesday."]],
checks:["If you approve it today, we ___ start tomorrow.|start,will start,started|1","We ___ start without a written instruction.|can't,don't,won't to|0","If the approval ___ late, the delay will be longer.|will come,comes,came|1"],
text:`In fit-out projects, the design almost always changes after the contract is signed. A client moves a wall, adds a meeting room or chooses a different material. Each change is a variation, and the way you handle it can protect your profit or destroy it.
When a client asks for a change, I never say "No problem" straight away. I explain the impact first, using the first conditional: "If we move the wall, we will need to change the ceiling and the lighting layout too." Clients often don't realise how one small change affects other trades and other packages.
I also avoid giving an exact price in the meeting. I say, "I'll send a quotation by Wednesday," and I give a rough idea only if they insist. Time is just as important as money, so I always mention the programme: "If you approve it this week, the delay will be small. If the approval comes late, it will be longer," because sometimes we have to remove finished work.
The most important rule is simple: no work starts without a written instruction. A friendly request today can become an argument about money three months later. Most clients understand this. When I explain it politely, and show that I want to finish within the agreed time, they usually say, "That's fair."`,
dlg:`Mark: The client wants to move the meeting room wall by one metre. Is that possible?
Karim: It's possible, but it's a variation. If we move the wall, we'll need to change the ceiling and the lighting layout too.
Mark: How much will it cost?
Karim: I can't give you an exact price today. I'll send a quotation by Wednesday. Roughly, it will add about three percent to the partitions package.
Mark: And what about time?
Karim: If you approve it this week, the impact will be small, maybe four or five days. If the approval comes late, the delay will be longer.
Mark: Can't you do it within the current programme?
Karim: I'm afraid not. The wall is already built, so we have to remove it and build it again.
Mark: OK. Please send the quotation with the time impact.
Karim: Sure. And we'll need a written instruction before we start any variation work.
Mark: That's fair. I'll ask the client today.`,
v:["variation|noun|a change to the work in the contract|أمر تغيير / فاريشن|The new door is a variation.","layout|noun|the way things are arranged in a space|التوزيع / اللاي أوت|The lighting layout has changed.","exact price|phrase|the correct final price, not an estimate|السعر بالظبط|I can't give you an exact price today.","quotation|noun|a document that gives a price for work|عرض سعر|We'll send a quotation tomorrow.","package|noun|a group of related works priced together|باكدج / حزمة أعمال|The ceiling package is the biggest one.","impact|noun|the effect of something|التأثير|What is the time impact?","approve|verb|officially say yes to something|يعتمد / يوافق|Please approve the sample.","programme|noun|the time schedule of a project (British English)|البرنامج الزمني|We're two weeks behind the programme.","remove|verb|take something away|يشيل / يفك|We need to remove the old ceiling.","written instruction|noun|an official order in writing|تعليمات مكتوبة|We can't start without a written instruction.","within|preposition|inside a limit of time or money|في حدود|Can you finish within two weeks?","that's fair|phrase|that is reasonable|ده منطقي / ده عدل|You want it in writing? That's fair."],
p:["Explain to a client what a variation will change and how it affects cost and time.","Tell a client politely that you can't start without a written instruction.","Explain what happens if the client approves early, and what happens if they approve late.","Describe a real variation from one of your projects."]},

{id:"B11",lvl:"A2+",me:"Karim",topic:"Commercial",title:"Negotiating with a subcontractor",g:"Comparatives · Could you…? · I could … if you …",
rows:[["Comparatives in negotiation","Your price is higher than the other offers."],["Could you + verb? to ask for a concession","Could you reduce your price by eight percent?"],["I could … if you … to offer a deal","I could give you five percent if you increase the advance."],["too much / not possible to refuse politely","Eight is too much. I'm afraid that's not possible."]],
checks:["Your price is ___ than the other offers.|high,higher,highest|1","___ you reduce the price by five percent?|Could,Would like,Should to|0","I could give you a discount ___ you pay in advance.|so,if,but|1"],
text:`Negotiating with subcontractors is a big part of my job. A good negotiation is not about winning. It's about reaching a deal that both sides can live with, because I'll probably need the same subcontractor again next year.
Before the meeting, I compare all the offers carefully. I look at the price, but also at the quality, the hardware and the payment terms. Then I decide two numbers: the price I want, and the price I can accept.
In the meeting, I start honestly: "Your price is higher than the other two offers." Then I ask for a concession with a polite question: "Could you reduce your price by eight percent?" The subcontractor usually comes back with a smaller number and a condition: "I could give you five percent if you increase the advance payment."
This is where the real negotiation happens. I can give something, but only with protection, for example an advance payment guarantee. When I can't accept a request, I say so clearly and give a reason, often our company policy. When the other side accepts, they might simply say, "That works for me."
When we agree, I repeat the deal in one sentence so there are no misunderstandings, and I send the purchase order quickly. The difference between a deal and a promise is paper.`,
dlg:`Karim: Thanks for coming, Tamer. Honestly, your price for the joinery is higher than the other two offers.
Tamer: I understand, but our quality is better, and we use better hardware.
Karim: I agree your quality is good. But the difference is about twelve percent. That's a lot for us.
Tamer: What price are you looking for?
Karim: We need to be closer to the lowest offer. Could you reduce your price by eight percent?
Tamer: Eight is too much. I could give you five percent if you increase the advance payment.
Karim: Our standard advance is ten percent. We could go to fifteen, but only against an advance payment guarantee.
Tamer: That works for me. And could we make the payment terms twenty-one days?
Karim: I'm afraid that's not possible. Thirty days is our company policy. But we always pay on time.
Tamer: OK. Five percent discount, fifteen percent advance, thirty days. Deal.
Karim: Great. I'll send you the purchase order by tomorrow.`,
v:["offer|noun|a price someone gives for work or goods|عرض|We received three offers.","honestly|adverb|to tell you the truth|بصراحة|Honestly, the price is too high.","quality|noun|how good something is|الجودة|Their quality is excellent.","difference|noun|the amount by which two things are not the same|الفرق|The difference is ten percent.","reduce|verb|make lower|يخفّض|Could you reduce your price by five percent?","advance payment|noun|money paid before work starts|دفعة مقدمة|The advance payment is ten percent.","guarantee|noun|a bank document that protects a payment|خطاب ضمان|We need an advance payment guarantee.","payment terms|noun|the rules for when and how you pay|شروط الدفع|What are your payment terms?","that works for me|phrase|I accept that|ده مناسب ليّا|Monday at ten? That works for me.","policy|noun|a company's official rule|سياسة|It's our company policy.","deal|noun|an agreement|اتفاق|OK, it's a deal.","purchase order|noun|an official order to buy (PO)|أمر شراء|I'll send the purchase order today."],
p:["Tell a supplier politely that their price is too high.","Ask for a discount and offer something in return.","Refuse a request politely and explain your company policy.","Summarise the final agreement of a negotiation."]},

{id:"B12",lvl:"A2+",me:"Karim",topic:"Commercial",title:"Following up on overdue payments",g:"Present perfect for the situation now · polite but firm",
rows:[["Present perfect for the situation now","The client hasn't signed it yet."],["Past simple for dates","We submitted it on the first of September."],["Polite but firm: I understand, but…","I understand, but this is affecting our cash flow."],["Asking for a commitment","Could you give me a date for the payment?"]],
checks:["The client ___ signed the invoice yet.|didn't,hasn't,isn't|1","We ___ the invoice on 1 September.|have submitted,submitted,submit|1","I understand, ___ we need the payment.|so,because,but|2"],
text:`Cash flow is the blood of a fit-out company. We pay for materials, workers and subcontractors every month, but our clients often pay us late. Following up on overdue invoices is one of the hardest conversations in my job, because I need the money, but I also need the relationship.
I always prepare the facts before I call. Which invoices are outstanding? When did we submit them? How many days are they overdue? Facts keep the conversation calm and professional. I use the past simple for dates and the present perfect for the situation now: "We submitted invoice seven on the first of September, and the client still hasn't signed it."
I'm polite, but I'm firm. When the client gives an excuse, I say, "I understand, but…" and explain the effect on our cash flow and on the site. Then I ask for a commitment: "Could you give me a date for the payment?" Often the answer is, "I'll ask the finance department to release it."
If the delay continues, I mention the contract, carefully: "According to the contract, late payments carry interest." I don't threaten to make a claim. I simply remind them that the clause exists. Finally, I send a short email to confirm what we discussed. People forget phone calls. They don't forget emails.`,
dlg:`Karim: Good morning, Sarah. Thanks for making time for this call. I'd like to talk about the outstanding payments.
Sarah: Of course. Which invoices do you mean?
Karim: Invoices seven and eight. We submitted invoice seven on the first of September, and it's now fifty-five days overdue.
Sarah: I know. The consultant has checked it, but the client hasn't signed it yet.
Karim: I understand, but we've already paid our suppliers and our workers. This is affecting our cash flow.
Sarah: I'll speak to the finance department today.
Karim: Thank you. Could you give me a date for the payment?
Sarah: I can't promise, but I'll try to get it released by the end of next week.
Karim: That would really help. I also need to mention that, according to the contract, late payments carry interest.
Sarah: Yes, I'm aware of that clause.
Karim: We don't want to make a claim. We want to keep a good relationship. But we need the payment to keep the same speed on site.
Sarah: That's clear. I'll update you on Thursday.
Karim: Thanks. I'll send you a short email to confirm what we discussed.`,
v:["thanks for making time|phrase|thank you for finding time to meet|شكراً إنك فضيت نفسك|Thanks for making time for this call.","outstanding|adjective|not yet paid|متأخر / لسه ماتدفعش|There are two outstanding invoices.","submit|verb|formally give a document|يقدّم|We submitted the invoice last month.","overdue|adjective|late, after the due date|متأخر عن ميعاده|The payment is thirty days overdue.","sign|verb|write your name to approve|يوقّع|The client hasn't signed it yet.","cash flow|noun|money coming in and going out|التدفق النقدي|Late payments hurt our cash flow.","finance department|noun|the team that handles money|الإدارة المالية|I'll ask the finance department.","release|verb|allow money to be paid|يصرف / يفرج عن|They released the payment today.","according to|phrase|as stated by|طبقاً لـ|According to the contract, we have thirty days.","clause|noun|one part of a contract|بند|Please check clause 14.","claim|noun|a formal request for money or time|مطالبة|We don't want to make a claim.","relationship|noun|the way people or companies work together|علاقة|We want a long relationship."],
p:["Remind a client politely about an overdue invoice.","Explain how late payment affects your project.","Ask for a clear payment date without sounding rude.","Mention a contract clause politely in a meeting."]},

{id:"B13",lvl:"B1",me:"Karim",topic:"Site",title:"Site walk with the client",g:"Present continuous · there is / are · going to",
rows:[["Present continuous: work happening now","We're installing the glass partitions."],["there is / there are: what you can see","There are still some gaps at the top."],["Place and direction","Here on the left… over there… upstairs"],["going to: the next step","We're going to close them with a shadow gap."]],
checks:["Look, the plumber ___ the pipes now.|tests,is testing,tested|1","There ___ some gaps at the top.|is,are,be|1","We ___ going to close the gaps tomorrow.|are,will,do|0"],
text:`A site walk with the client is very different from a meeting in an office. You're walking, pointing and answering questions at the same time, often with noise all around you. It's also your best chance to show the progress you've made.
Before the client arrives, I walk the route myself. I check which areas look good and which areas might cause questions. I'd rather explain a problem myself than wait for the client to find it.
During the walk, I describe what's happening now, using the present continuous: "Here on the left, we're installing the glass partitions. The frames are fixed, and the glass is arriving tomorrow." For things the client can see, I use there is and there are: "As you can see, there are still some gaps at the top." And for the next step, I use going to: "The carpenters are going to close them with a shadow gap detail."
When the client notices a problem, like a leak or a damaged panel over there in the corner, I stay calm. I explain what happened, what we're doing about it and when it will be fixed. Clients don't expect a perfect site. They expect a contractor who is clearly in control. I also make sure to send photos the next day.
Finally, safety comes first. I always remind visitors to watch their step and keep their helmets on. It's a small thing, but it shows that we take the site seriously. And when we walk through a door, I let the client go first: "After you."`,
dlg:`Karim: Welcome to the site, Mark. Let's start on the ground floor.
Mark: Thanks. Wow, it looks very different from last week.
Karim: Yes, we're making good progress. Here on the left, we're installing the glass partitions. The frames are fixed, and the glass is arriving tomorrow.
Mark: What's happening in the reception area?
Karim: The carpenters are fixing the wall panels. As you can see, there are still some gaps at the top. We're going to close them with a shadow gap detail.
Mark: OK. And why is there water on the floor over there?
Karim: Good question. The plumber is testing the pantry pipes, and there's a small leak at one joint. He's fixing it now.
Mark: Please make sure it's dry before the flooring starts.
Karim: Of course. We'll test it again tomorrow morning and send you a photo.
Mark: Great. Shall we go upstairs?
Karim: Sure. Please watch your step and keep your helmet on. After you.`,
v:["progress|noun|movement forward in the work|تقدّم|We made good progress this week.","install|verb|put something in place|يركّب|We're installing the doors today.","frame|noun|the structure that holds glass or a door|فريم / إطار|The door frames are fixed.","carpenter|noun|a person who works with wood|نجار|The carpenters are on the second floor.","as you can see|phrase|used when pointing at something|زي ما انت شايف|As you can see, the ceiling is finished.","gap|noun|an empty space between two things|فراغ / فتحة|There's a gap under the door.","over there|phrase|in that place, not near|هناك|The samples are over there.","plumber|noun|a person who fixes water pipes|سبّاك|The plumber is testing the pipes.","leak|noun|water coming out where it shouldn't|تسريب|There's a leak in the pantry.","make sure|phrase|check that something happens|اتأكد|Make sure the floor is dry.","watch your step|phrase|be careful where you walk|خلي بالك وانت ماشي|Watch your step. The floor is wet.","after you|phrase|a polite way to let someone go first|اتفضل انت الأول|After you, please."],
p:["Walk a client around your site and explain what is happening in each area.","Describe a problem you can see on site and what you are doing about it.","Answer a client's question: \"Why isn't this area finished yet?\"","Give a short safety reminder to visitors on site."]},

{id:"B14",lvl:"B1",me:"Karim",topic:"Site",title:"Coordination problems and drawings",g:"Past continuous + past simple · options · could / might",
rows:[["What you were doing when you found the problem","While we were setting out the ceiling, we noticed a clash."],["Explaining the problem","The drawings don't match. It isn't shown on the drawing."],["Giving options: We can… or … can…","We can lower the ceiling, or they can reroute the duct."],["could / might for possible effects","It could cost more. It might affect the design."]],
checks:["While we ___ the ceiling, we noticed the clash.|set out,were setting out,are setting out|1","The two drawings don't ___.|match,matching,matches|0","A lower ceiling ___ affect the design. We're not sure.|must,might,will to|1"],
text:`Coordination problems are one of the biggest causes of delay in fit-out projects. The architect, the MEP engineer and the contractor all work from different drawings, and those drawings don't always match. The earlier you find a clash, the cheaper it is to fix.
Last month, while we were setting out the ceiling on the second floor, my site engineer noticed that a duct crossed a beam at exactly the same level as the ceiling. Nobody had seen it on the shop drawings. Finding it a month later would have meant removing finished work, so we were lucky.
When I explain a problem like this, I use the past continuous for what we were doing and the past simple for what we found. Then I give options, not just problems: "We can lower the ceiling by ten centimetres, or the MEP contractor can reroute the duct." I compare the options in terms of time, cost and design, using could and might: "Rerouting could cost more." "A lower ceiling might affect the design."
Finally, I never rely on a verbal answer for design changes. I send a marked-up drawing and raise an RFI, so the decision is in writing. The consultant usually replies within three working days, and later, nobody can argue about what was decided or why. Good coordination is not exciting work, but it's the work that keeps a project on time.`,
dlg:`Mark: Karim, Ali told me about a clash on the second floor. What happened?
Karim: While we were setting out the ceiling, we noticed that the duct crosses the beam at the same level as the ceiling.
Mark: Isn't that shown on the shop drawings?
Karim: No. The MEP drawing and the architectural drawing don't match. The ceiling is at two point eight metres, but the duct is at two point seven.
Mark: So what do you suggest?
Karim: There are two options. We can lower the ceiling by ten centimetres in the corridor, or the MEP contractor can reroute the duct.
Mark: Which one is better?
Karim: Lowering the ceiling is quicker. Rerouting could take two weeks, and it could cost more.
Mark: I need to check with the architect. A lower ceiling might affect the design.
Karim: Understood. I'll send you a marked-up drawing with both options and raise an RFI today.
Mark: Good. I'll reply within three working days.`,
v:["coordination|noun|making different teams' work fit together|التنسيق|We have a coordination meeting every Monday.","clash|noun|when two elements are in the same place|تعارض / كلاش|There's a clash between the duct and the beam.","set out|phrasal verb|mark positions on site before building|يعمل توقيع / تخطيط|We set out the partitions yesterday.","notice|verb|see or become aware of something|ياخد باله|I noticed a crack in the wall.","shop drawings|noun|detailed drawings made by the contractor|رسومات تنفيذية|Please approve the shop drawings.","match|verb|be the same or agree|يتطابق|The drawings don't match.","option|noun|a possible choice|اختيار / بديل|We have two options.","reroute|verb|send by a different path|يغيّر مسار|They can reroute the pipes.","affect|verb|have an effect on|يأثر على|The delay will affect the handover.","marked-up drawing|noun|a drawing with notes and changes drawn on it|رسمة عليها تعليقات|Send me a marked-up drawing.","raise an RFI|phrase|send a formal Request for Information|يرفع استفسار فني|I'll raise an RFI today.","working days|noun|days that are not weekends or holidays|أيام عمل|I'll reply within three working days."],
p:["Explain a clash or drawing problem you found and how you found it.","Give two options to solve a site problem and compare them.","Ask the consultant for a decision politely.","Explain why you want the answer in writing."]},

{id:"B15",lvl:"B1",me:"Karim",topic:"Site",title:"Snagging and handover",g:"need + -ing · will for promises · If … doesn't …",
rows:[["need + -ing for repairs","The door closers need adjusting."],["don't / doesn't + verb for defects","Three doors don't close properly."],["will for promises","We'll repaint those walls this week."],["If … doesn't …, we'll …","If it doesn't come out, we'll replace the tile."]],
checks:["The door closers ___ adjusting.|need,needs to,needing|0","Three doors ___ close properly.|doesn't,don't,aren't|1","If the stain doesn't come out, we ___ replace the tile.|replace,will replace,replaced|1"],
text:`The end of a project is often the most stressful part. The client is moving in soon, everyone is tired, and suddenly you receive a snag list with forty or fifty items. How you handle this list decides how the client will remember the whole project.
My first rule is not to argue about every item. Most snags are minor: paint that isn't even, doors that don't close properly, or a missing cover plate. I go through the list with the client, accept what is ours and give a clear date: "Agreed. We'll repaint those walls this week." For repairs, I often use need with -ing: "The door closers need adjusting. That's a quick fix."
Sometimes an item isn't our fault. Another contractor may have damaged our work, for example the IT team leaving a stain on the carpet. I explain this politely and without blame, but I still offer a solution: "We'll try to clean it, and if it doesn't come out, we'll replace the tile." The client remembers the solution, not the argument.
When the list is finished, I ask for a final inspection. At the same time, I prepare the handover documents: as-built drawings, O&M manuals and warranties. A good handover is quiet and organised. If the client says, "That was easy," we did our job well, even if the last two weeks were anything but easy for us.`,
dlg:`Mark: We walked through the offices yesterday with the client. Here's the snag list. There are forty-two items.
Karim: Thank you. Most of them look minor. Shall we go through the main ones?
Mark: Sure. First, the paint on the corridor walls isn't even. You can see marks under the lights.
Karim: Agreed. We'll repaint those walls this week.
Mark: Second, three doors in the meeting rooms don't close properly.
Karim: The door closers need adjusting. That's a quick fix. We'll do it tomorrow.
Mark: And the carpet in room 204 has a stain near the window.
Karim: I'm afraid that wasn't us. The IT team was working there last week. But we'll try to clean it, and if it doesn't come out, we'll replace the tile.
Mark: Thank you. When can you finish everything?
Karim: We need ten working days. After that, we'd like to arrange a final inspection.
Mark: Fine. And please don't forget the as-built drawings.
Karim: They're almost ready. We'll submit them with the handover documents.`,
v:["snag list|noun|a list of small defects to fix before handover|ليستة الملاحظات|We received the snag list today.","minor|adjective|small, not serious|بسيط|These are minor items.","go through|phrasal verb|look at things one by one|نراجع واحدة واحدة|Let's go through the list.","even|adjective|flat and the same everywhere|مستوي / منتظم|The paint isn't even.","agreed|phrase|I agree|متفق|Agreed. We'll fix it.","properly|adverb|correctly|كويس / صح|The door doesn't close properly.","quick fix|noun|a repair that is fast and easy|تصليح سريع|That's a quick fix.","stain|noun|a dirty mark that is hard to remove|بقعة|There's a stain on the carpet.","replace|verb|put a new one in place of the old one|يغيّر / يستبدل|We'll replace the broken tile.","final inspection|noun|the last check before handover|المعاينة النهائية|Let's arrange the final inspection.","as-built drawings|noun|drawings showing the work as it was built|رسومات As-built|We'll submit the as-built drawings.","handover|noun|giving the finished project to the client|التسليم|Handover is next month."],
p:["Go through three snag items and say what you will do about each.","Tell a client politely that a defect was not your team's fault.","Give a realistic finish date for the snag list and ask for an inspection.","Explain which documents you will submit at handover."]},

{id:"B16",lvl:"B1",me:"Karim",topic:"Tender",title:"Tender clarification meeting",g:"Clarification questions · included / excluded",
rows:[["Could you clarify / explain + noun?","Could you clarify the scope for the reception desk?"],["Does the price include…? · Is … part of our scope?","Are the MEP works part of our scope?"],["included / excluded","The loose furniture is excluded."],["going to for announced changes","We're going to extend the date by one week."]],
checks:["Could you ___ the scope, please?|clarify,clarifying,to clarify|0","___ the price include delivery?|Is,Does,Do|1","The loose furniture is ___. The client will buy it.|included,excluded,extended|1"],
text:`Every tender starts with a pile of documents: drawings, specifications, a BOQ and the contract conditions. They're never perfect. Some items are missing, some drawings don't match the BOQ, and some descriptions can mean two different things. The tender clarification meeting is my chance to ask before I price.
I prepare my questions in advance and group them by topic: scope, drawings, programme and commercial terms. I use polite, clear questions: "Could you clarify the scope for the reception desk?" "Does our price include the loose furniture?" "Are the MEP works part of our scope?"
The answers matter a lot. If something is excluded, I don't price it. If an item says supply and install but there's no detail drawing, I need that detail before I can give a fair price, so I ask for an addendum. A wrong assumption at this stage can turn a good project into a loss, especially when part of the work is under a separate contract.
I also check the rules and dates: the submission date, the validity period and how many copies they want. If the client issues an addendum, I ask whether they'll extend the submission date. Finally, I ask for the minutes of the meeting, because every bidder should receive the same answers. In a tender, clarity protects everyone, including the client.`,
dlg:`Mark: Thank you for coming to the clarification meeting. Do you have any questions about the tender documents?
Karim: Yes, a few. First, could you clarify the scope for the reception desk? The BOQ says supply and install, but there's no detail drawing.
Mark: Good point. We'll issue a detail drawing next week as an addendum.
Karim: Thank you. Second, should our price include the loose furniture?
Mark: No, the loose furniture is excluded. The client will buy it directly.
Karim: And are the MEP works part of our scope?
Mark: Only the lighting and small power. HVAC is under a separate contract.
Karim: Understood. What's the validity period for the tender?
Mark: Ninety days from the submission date.
Karim: Will the submission date stay the same after the addendum?
Mark: We're going to extend it by one week. We'll confirm by email.
Karim: Great. Could you also send us the minutes of this meeting?
Mark: Of course. All bidders will receive the same minutes.`,
v:["tender|noun|a formal process to get prices from companies|مناقصة / تندر|We're preparing a tender for a bank.","clarify|verb|make something clear|يوضّح|Could you clarify this item?","scope|noun|the work included in a contract|نطاق الأعمال|Is that in our scope?","supply and install|phrase|provide the material and fix it in place|توريد وتركيب|The item is supply and install.","addendum|noun|an official addition to tender documents|ملحق|They issued an addendum yesterday.","include|verb|have as part of the whole|يشمل|Does the price include VAT?","excluded|adjective|not included|مستبعد / مش مشمول|Furniture is excluded.","separate contract|noun|a different contract with another company|عقد منفصل|HVAC is under a separate contract.","validity period|noun|how long a price offer stays valid|مدة صلاحية العرض|The validity period is ninety days.","submission date|noun|the last date to hand in the tender|ميعاد التقديم|The submission date is the twentieth.","extend|verb|make longer|يمدّد|Can you extend the deadline?","bidder|noun|a company that submits a price in a tender|مقدّم عطاء|There are five bidders."],
p:["Ask three clarification questions about a tender.","Explain what is included and excluded in your price.","Ask for an extension of the submission date and give a reason.","Explain your company's scope of work in one minute."]},

{id:"B17",lvl:"B1",me:"Karim",topic:"Procurement",title:"Meeting a supplier about samples",g:"will · going to · by / on with dates · once",
rows:[["will: offers and simple future","It'll take three days."],["going to: plans already decided","I'm going to send you the certificate today."],["Dates: by (deadline) / on (exact day)","by the first of December · on the twelfth of January"],["Once / If + present for a future condition","Once I get the certificate, I'll submit it."]],
checks:["We need the panels ___ the fifteenth of January.|in,by,at|1","Once I ___ the sample, I'll submit it.|will get,get,got|1","It ___ take three days to make a new sample.|will,is,does|0"],
text:`A fit-out project is only as good as its suppliers. A beautiful design means nothing if the panels arrive late or don't meet the specification. That's why my meetings with suppliers are as important as my meetings with clients.
The first topic is usually the sample. The client might like the oak finish but want a darker colour, so I explain the comment clearly and agree a date for the new sample. Then we talk about the lead time, which has two parts: production and delivery. If the programme is tight, I work backwards from the date the site needs the material: "If the site needs the panels by the fifteenth of January, when do you need the approved sample?"
Technical documents come next. The specification may ask for a certain fire rating, so I ask for the test certificate. I also check the warranty, both on materials and on workmanship, because many problems appear only after handover.
I use will for offers and simple future facts, like "It'll take three days," and going to for plans that are already decided, like "I'm going to send the certificate today." Once I have everything, I submit it to the consultant for approval. And whatever the supplier promises, I ask them to confirm in writing. Memories are short, but emails stay.`,
dlg:`Karim: Thanks for the samples, Nour. The client liked the oak finish, but they want a darker colour.
Nour: No problem. We can make a darker sample. It'll take three days.
Karim: Good. What's the lead time after approval?
Nour: Six weeks for production and one week for delivery.
Karim: Seven weeks is tight for us. The site needs the panels by the fifteenth of January.
Nour: If we receive the approved sample and the order by the first of December, we can deliver on the twelfth of January.
Karim: That works. Can you confirm that in writing?
Nour: Yes, I'll put it in our offer.
Karim: What about the fire rating? The specification asks for Class B.
Nour: Our panels are Class B. I'm going to send you the test certificate today.
Karim: Perfect. And the warranty?
Nour: Two years on materials and workmanship.
Karim: OK. Once I get the certificate and the new sample, I'll submit them to the consultant for approval.`,
v:["finish|noun|the surface look of a material|التشطيب / الفينش|We chose a matt finish.","darker|adjective|with more black in the colour|أغمق|The client wants a darker colour.","production|noun|making goods in a factory|التصنيع|Production takes six weeks.","tight|adjective|with very little time to spare|ضيق|The programme is very tight.","approved sample|noun|a sample the client officially accepted|عينة معتمدة|Keep the approved sample on site.","confirm in writing|phrase|send an official written confirmation|يأكّد كتابةً|Please confirm the date in writing.","fire rating|noun|how well a material resists fire|درجة مقاومة الحريق|What's the fire rating of the door?","specification|noun|the technical document that describes materials|المواصفات|Check the specification first.","test certificate|noun|an official document showing test results|شهادة اختبار|Send us the test certificate.","warranty|noun|a promise to repair problems for a time|ضمان|The warranty is two years.","workmanship|noun|the quality of the work done|المصنعية|The workmanship is excellent.","once|conjunction|as soon as, after|أول ما|Once we get approval, we'll start."],
p:["Ask a supplier about lead time and delivery dates.","Explain a client's comment on a sample and ask for a change.","Ask a supplier for technical documents (certificates, warranty).","Explain your approval process to a supplier."]},

{id:"B18",lvl:"B1",me:"Karim",topic:"Reporting",title:"Presenting the weekly progress report",g:"Past simple · comparing weeks · going to",
rows:[["Past simple: what you did this week","We finished the ceilings on the ground floor."],["Comparing weeks","better than the week before · our best week so far"],["going to: next week's plan","Next week, we're going to install the glass."],["Numbers and change: reach, gain, increase from … to …","We increased the team from forty to fifty workers."]],
checks:["This week we ___ the ceilings.|finish,finished,have finish|1","It was our ___ week so far.|good,better,best|2","Next week, we're ___ start painting.|going to,will to,going|0"],
text:`Every Thursday, I present our weekly progress report to the client and the consultant. It takes ten minutes, but those ten minutes shape how the client sees the whole project. A clear report builds trust. A confusing one creates questions.
I always follow the same structure, and I usually take people through it on a shared screen. First, the overall progress, with numbers: "This week, the overall progress reached sixty-two percent. Last week it was fifty-six, so we gained six percent." Numbers are more convincing than words like "good" or "fast".
Second, what we did this week, in the past simple: "We finished the ceilings on the ground floor and started the flooring on the first floor." Third, on the commercial side: variations submitted, approvals received and payments pending.
Fourth, and this is the part many people skip, the risks. I name the two or three biggest risks honestly, for example glass arriving later than planned, or an approval that's still missing. Hiding a risk doesn't make it disappear. It only makes the surprise bigger later.
Finally, I explain the plan for next week with going to: "Next week, we're going to install the glass and increase the team from forty to fifty workers." I ask for questions before I stop sharing, and then I send the report with photos. When the client answers my requests with a simple "Will do," I know the meeting worked.`,
dlg:`Sarah: Karim, can you take us through this week's progress report?
Karim: Sure. Let me share my screen. This week, the overall progress reached sixty-two percent. Last week it was fifty-six, so we gained six percent.
Sarah: That's better than the week before.
Karim: Yes, it was our best week so far. We finished the ceilings on the ground floor and started the flooring on the first floor.
Sarah: And on the commercial side?
Karim: We submitted two variation quotations and received one approval.
Sarah: Any risks?
Karim: Two main risks. First, the glass is arriving later than planned. Second, the client still hasn't approved the reception marble.
Sarah: What's the plan for next week?
Karim: We're going to install the glass partitions and start painting on the first floor. We're also going to increase the team from forty to fifty workers.
Sarah: Sounds good. Please send the report with photos after the meeting.
Karim: Will do. Any questions before I stop sharing?`,
v:["take us through|phrase|explain something step by step|اشرح لنا خطوة خطوة|Can you take us through the numbers?","progress report|noun|a document showing how much work is done|تقرير التقدم|I send the progress report every Thursday.","overall progress|noun|the total percentage of work completed|نسبة الإنجاز الكلية|Overall progress is sixty percent.","reach|verb|get to a level|يوصل لـ|Progress reached seventy percent.","gain|verb|increase by an amount|يكسب / يزيد|We gained five percent this week.","so far|phrase|until now|لحد دلوقتي|It's our best month so far.","on the commercial side|phrase|about money and contracts|من الناحية التجارية|On the commercial side, two invoices are pending.","risk|noun|a possible problem in the future|خطر / مخاطرة|The main risk is the glass delivery.","later than planned|phrase|after the planned date|متأخر عن المخطط|The marble is arriving later than planned.","increase|verb|make bigger|يزوّد|We'll increase the team next week.","will do|phrase|short for \"I will do that\"|حاضر / هعملها|Send the photos? Will do.","stop sharing|phrase|end showing your screen|يوقف مشاركة الشاشة|I'll stop sharing now."],
p:["Present this week's progress on a real or imagined project in one minute.","Compare this week with last week using numbers.","Explain the two main risks on your project.","Say what your team is going to do next week."]}
);
