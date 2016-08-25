---
layout: post
title: 初学者与初期码农
category: toTeacher
tags: 教学理念 
author: 孔颖【翻译】
keywords: lanqiao 蓝桥 培训 教学理念
description:
---

# 导读

Zed Shaw, “Learn Code the Hard Way” 系列博客的作者, 最近写了一篇非常好的博文——Early v.s. Beginning Coders（初期程序员和初学者）原文链接→[Early vs. Beginning Coders](https://zedshaw.com/2015/06/16/early-vs-beginning-coders/). 在这篇文章中，作者指责多数编程教学者不会教编程。

本文核心：“初学者”不是“初期程序员”。“初学者”是真正的0基础、甚至不会打字、不会用鼠标……；而“初期程序员”是有一定计算机功底、甚至稍微掌握编码基础的人。正确教学和正确编写、使用教材的前提是你区分开了码农的层次。有了这样的概念，作者提出在成为初期码农之前应该经过大量的简单而具体的训练，以牢固掌握语法、概念以及语法背后的计算机行为，而成为初期码农之后，需要大量的项目实战才能帮助码农过渡到初级。

码农的级别依次是

  初学程序员 <初期程序员< 初级程序员

接下来是对全文的翻译：

# 早期开发与初学开发

>When I was working on Learn Python The Hard Way I was frustrated by how often I’d have to explain that the book is for a total beginner. The problem is that most of the technology world considers someone with about two programming languages under their belt a “beginner”, but learning two programming language would take you about 4-6 months. After 6 months you can’t really say someone is a beginner since, well, 6 months later is not the beginning. The beginning of something is…I mean why do I have to say this…at the beginning. Not 6 months later.

当我写《笨办法学Python》这本书时，我不得不常常解释说"这是一本完全面向初学者的书"，因此我很沮丧。问题在于IT界大部分人认为那些掌握了两门编程语言的人才是“初学者”，但是学习两门编程语言大概需要4-6个月的时间。学习6个月就不能再称为初学者了。所谓初学者，我指的是完全零基础。

>It seems pedantic but this is a constant problem in the technology education world. When you look at the categories for technology book publishers they only have categories for “beginner” that fit the model of a person who’s not really a beginner. My book actually didn’t fit into many publisher’s categories since it was targeted at an audience that was before this level. This showed a completely ignored group of people, and it’s a very good sign that most technologists simply have no concept that there are non-programmers who want to learn programming.

说这些有点卖弄学问，但是在IT教育领域这是个一尘不变的问题。如果你去翻技术图书，出版物上只有适合“初学者”的字样，而这些书恰恰不是给零基础的人看的。我的书不在这种“初学者”的范畴内，因为它适合级别更低一点的受众。这是一个完全被忽视的群体，而且很好的表明了大多数技术人员根本没有非程序员们想要学习编程的概念。

>To me this inability to visualize a person who is a total beginner is a symptom of most programmers being terrible at teaching programming. They frequently have bizarre ideas about teaching programming because they can’t visualize a person who knows absolutely nothing. My favorite is how they think you should teach programming without teaching “coding”, as if that’s how they learned it. They’ll have this imagined idea that they learned programming in their first discrete mathematics course, when really they were probably typing the code out of a book when they were 11 and simply don’t consider that where they learned to code. Or, they didn’t really learn programming in that class and only actually learned it when they sat down and went through a book that taught them code. Their arrogance simply makes them think they did, but I don’t know anyone who took an abstract “no coding” class and then went and wrote Java or Lisp without going through at least one book teaching how to code.
I have no idea why these people have such a hard time visualizing someone with zero knowledge, but I think a simple change to the nomenclature of software developers would help to at least talk about it.

对我来说，由于很难设想零基础的学员是什么情况，大部分程序员都不会教程序。他们在教编程时，经常会有一些奇怪的想法，因为他们根本没意识到学生真的是什么也不懂。最有意思的（例子）是他们觉得可以绕过教编码来教编程，好像他们当年是这样学编程的。他们会有这样的想象，就是在学习第一节离散数学课的时候就已经开始学习编程了，他们可能在11岁刚脱离书本敲代码，只是没有认识到他们是在哪里学会了编码。或者，他们并没有真正在这个年纪学习编程，而只是在坐下来看书的时候，学会了编码。他们自负地认为已经学会了编程，但我不认为某人上了一节抽象空洞的“无编码”课，没有翻阅过一本编码教学的书，就能去写Java或者Lisp程序。我不知道为什么这些人无法想象零基础是什么，但我认为软件开发人员名称的一个简单的变化至少有助于谈论它。

# The Beginning Is At the Beginning

>What I propose is we have beginning coders and early coders. I got this idea from a painting teacher who kept referring to students who had never painted as “beginners”, but those who had painted for about one class as “early”. The reasoning is that you need a way to differentiate people who don’t know a damn thing vs. people who know the basics but just simply suck at them. Teaching a beginner is very different from teaching someone who’s already been doing it for a bit and just needs more training.

初学就只是初学

我的建议是我们有初学的码农，也有初期的码农。我是从一位绘画教师那里得到的灵感，他一直把没画过画的学生称为“初学者”，而把学过几节课的学生称为“初期者”。原因是你需要方法来区分那些完全一窍不通和那些知道一点但又没完全掌握的人。教“初学者”和教那些已经有基础但需要多加练习的人完全不一样。

>For example, a beginning coder doesn’t know how to type the `|` (pipe) character. They don’t even know it’s called a “pipe”. I’m not joking about this. Professionals actually don’t believe me when I tell them this, but it’s true. Beginners have zero experience so simple things like making a text file, opening terminal, and even the idea that you can type words at a computer and it will do stuff, are simply unknown to them. To teach a beginner effectively requires this level of information slowly fed to them in reasonable chunks.

例如，初学的码农不知道怎么打出`|`（pipe）这个函数。他们甚至不知道这词叫pipe。我不是开玩笑。我和专业人士说这些的时候，他们都不相信我，但这是事实。初学者对一些简单的事完全没有经验，比如打开一个文本文件，打开终端，甚至可以在电脑上敲出一系列单词，它会自动完成工作。为了有效的教学，上述这些信息需要逐渐而且合理的教给零基础的初学者。

>The best analogy I have for this comes from either music or martial arts. In those disciplines you have a set of things that beginners need to get through repetition before they can start the process of actually learning. In music this is simple things like names of notes, ear training, scales, where notes are, and harmony training. In martial arts this is things like building strength, flexibility, how to stand, the names of techniques, and blocking. Without this initial basic repetitive training to get these core skills deeply ingrained the beginner will simply flounder trying to learn at the early stage and have a difficult time progressing to deeper understanding.

类似这样的事例还发生在音乐或武术界。在这些领域里，初学者在真正开始学套路之前，已经反复练习过很多东西了。在音乐方面，这些简单的东西是指音符名称、练耳、音阶、音符所在位置、以及和声训练。在武术领域一般指学会运气、灵活性、站姿、套路名称和防御。没有这些初期基本动作的反复练习来打下扎实的基础，初学者将只能停留在早期的水平，将来往更深层次发展也会很困难。

>My current method for training up beginners is to make them learn the basics of 4 programming languages. I’m not sure why 4 seems to be the magic number, but after they’ve gone through 4 programming books and learned to make tiny little programs plus all the syntax, they seem to have a firm grasp of the basics. This phase is all about learning concrete simple things, but also understanding the idea that the concrete things are just standing in for abstract concepts. In one language `||` (two pipe symbols) might mean “or” and another language will use the actual word “or” but this is the same concept and the symbol doesn’t matter. After their fourth language they get this and can then move on to being an early coder.

目前我教导初学者的方法是学习4种编程语言的基础知识。我也不确定为什么4种会好一点，但是初学者浏览过4种编程教材，学会在微小程序上加上语法，他们似乎牢牢的掌握了基础知识。这个阶段只是学习具体简单的东西，但也能了解具体的东西是建立在抽象的概念之上的。在一种语言里`||`（两个pipe符号）可能表示“或者”，而在另一种编程语言里将会直接用“或者”这个词，但是这是同样的概念，只是符号使用不同。在看了4种编程语言之后，初学者就会了解这一点，然后可以成为一个初期者。

# Early Is After The Beginning

>An early programmer is different from a beginner because they have the basic skills understood, but have a hard time applying them to problems. The early coder’s next challenge is problem solving, which is a much more abstract skill that takes longer to master. A beginner’s hurdle is training their brain to grasp the concrete problem of using syntax to create computation and then understanding that the syntax is just a proxy for how computation works. The early coder is past this, but now has to work up the abstraction stack to convert ideas and fuzzy descriptions into concrete solutions. It’s this traversing of abstraction and concrete implementation that I believe takes someone past the early stage and into the junior programmer world.

初学之后是初期

一个初期的程序员与零基础程序员完全不同，因为他们理解基础技能，但是解决问题时仍有困难。初期者的下一步挑战是解决问题，这是一个更抽象的技巧，距离成熟的程序员还有一段差距。初学者的障碍是脑力训练，掌握用语法来创建计算程序这类具体的问题，然后理解那些代表计算机如何工作的语法。初期者已经跨越了这个层次，现在必须把抽象概念转变成换算方法，把模糊的概念转变成具体的解决方案。完成这个从抽象到具体的跨越，我相信某人就经过了初期阶段，进入初级程序员的世界。

>The best analogy for this would be with creative writing. First, a student has to spend time learning the alphabet, then words, reading, writing, and other concrete things. Even before that they have to learn to comprehend their native language(s) or else it’s difficult to teach them reading and writing. After they’ve learned this concrete task of reading and writing, through lots of mechanical repetition, they move on to the task of conceptual writing. They’re given problems of writing stories or essays and then figuring out how to express these ideas in concrete words.

创作型写作是上述状况很好的一个例子。首先，学生要花时间来学习字母、单词、阅读、写作和其它具体的事情。此前他们甚至要学会掌握母语，否则很难教会他们阅读和写作。他们学会阅读和写作这一具体任务之后，经过大量机械的反复锻炼，就可以进行概念性创作。他们在创作故事或散文时会遇到问题，然后找出如何用具体的语言来表达这些思想。

>I’m not quite sure what takes someone from early to junior other than just attempting lots of projects with guidance. Similar to writing, painting, and wood carving, I think given a lot of projects to complete and then being critiqued on the results is probably the best way to build them up. With that in mind I started a new blog Projects The Hard Way which will feature a sequence of projects in varying levels of difficulty. I’ll see what ends up working best and how to work with early coders using this format.

除了在指导下参与大量的项目，我不太确定从初期到初级程序员还需要做什么。就像从事写作、画画、木雕的人，做完大量的项目然后就结果给予批判，可能是让他们成长的最好的方式。有了这个想法之后，我开了个新博客“笨办法项目”，那里列出了困难等级不同的一系列项目。我想知道怎样以最佳结果完成工作，如何运用这种模式和初期码农一起工作。

# Significance

>My idea isn’t new of course, but now that I have a word for who I’m trying to teach, next I can focus exactly on that person. By saying, “This is for earlycoders,” I’m able to craft exercises that will work to build their skill level up and take them out of the early stages and able to create things. I’m thinking that it won’t matter what kinds of projects they do, just that they do a bunch of them.

重要性

当然，我的想法并不新颖，但现在我对未来的学生有话要说，接下来我才能专注的教他。“这是给初期码农的，” 我能够设计大量练习，这些习题将会提升他们的技能，尽快让他们摆脱初期状态，能够创造价值。我认为，他们做了什么项目并不重要，重要的是他们做项目的过程。

>My only question is how many projects ends up being the breaking point for most people? Is it 10, 20? How much variation is there between them? Or, is it more a question of time and not quantity of effort?

我唯一的问题是，完成多少个项目才是多数人的突破点？10个？20个？这些人之间又有多少变化？或者，这只是个时间问题而不是数量问题？ 

>Either way, I’ll be hammering this divide between beginner and early so that we can properly place educational efforts and materials where they belong. Now if I can only get the few people writing books for beginners to stop assuming every beginner is a little kid or a total idiot I’d be set!

无论怎样，我都会区分初学者和初期者，以便我们能够正确地教授他们课程，使用正确的教材。现在，即使少数人能写出给初学者的书，但是不把他们当成小孩子或者白痴，我会毫不犹豫地和他们合作！

