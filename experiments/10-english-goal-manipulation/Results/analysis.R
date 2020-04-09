library(ggplot2)
library(reshape2)
library(lme4)
library(dplyr)

setwd("~/GitHub/chinese_scope/experiments/10-english-goal-manipulation/Submiterator-master/")

source("../results/helpers.r")

d = read.csv("10-english-goal-manipulation-trials.csv",header=T)
s = read.csv("10-english-goal-manipulation-subject_information.csv",header=T)

d$language = s$language[match(d$workerid,s$workerid)]
#d$describe = s$describe[match(d$workerid,s$workerid)]
#d$lived = s$lived[match(d$workerid,s$workerid)]
d$age = s$age[match(d$workerid,s$workerid)]
d$gender = s$gender[match(d$workerid,s$workerid)]
#d$proficiency = s$proficiency[match(d$workerid,s$workerid)]
#d$outsideLanguage = s$outsideLanguage[match(d$workerid,s$workerid)]
#d$homeLanguage = s$homeLanguage[match(d$workerid,s$workerid)]
#d$yearsLived = s$yearsLived[match(d$workerid,s$workerid)]
d$comments = s$comments[match(d$workerid,s$workerid)]
d$assess = s$assess[match(d$workerid,s$workerid)]

unique(d$language)

# only English as native language
d = d[d$language=="English"|
        d$language=="english"|
        d$language=="ENGLISH"|
        d$language=="eng"|
        d$language=="Engish"|
        d$language=="English "|
        d$language=="Enligsh"|
        d$language=="AENGLISH"|
        d$language=="Englist"|
        d$language=="english"|
        d$language=="Wnglish",]
#d = d[d$assess=="Yes",]
unique(d$language)

length(unique(d$workerid)) # n=546 (600)

################################

t = d[d$trial_type=="one_slider"&d$item!="control1"&d$item!="control2"&d$item!="control3"&d$item!="control4"&d$item!="control5"&d$item!="control6"&d$item!="control7"&d$item!="control8",]

#e_agg = aggregate(response~context*number*QUD*quantifier,data=t,FUN=mean)
#e_agg

#table(t$context,t$number,t$QUD,t$quantifier)


e_numeral_s = bootsSummary(data=t[t$quantifier=="numeral",], measurevar="response", groupvars=c("context","number","QUD"))

e_numeral_plot = ggplot(data=e_numeral_s,aes(x=number,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=number, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  ylab("endorsement rate") +
  labs(fill="early-success")+
  facet_wrap(~QUD)+
  theme_bw()#+
e_numeral_plot
#ggsave("../results/english-numeral.png")


e_quantifier_s = bootsSummary(data=t[t$quantifier=="every",], measurevar="response", groupvars=c("context","QUD"))

e_quantifier_plot = ggplot(data=e_quantifier_s,aes(x=QUD,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=QUD, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  ylab("endorsement rate") +
  labs(fill="early-success")+
  #facet_wrap(~QUD)+
  theme_bw()#+
e_quantifier_plot
#ggsave("../results/english-quantifier.png")


context_s = bootsSummary(data=t[t$quantifier=="numeral",], measurevar="response", groupvars=c("context","number"))

context_plot = ggplot(data=context_s,aes(x=number,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=number, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  #labs("order\npreference")+
  #facet_wrap(~QUD)+
  theme_bw()#+
#ggsave("../results/english-numeral-context.png")
context_plot

context_item_s = bootsSummary(data=t, measurevar="response", groupvars=c("context","number","item"))

context_item_plot = ggplot(data=context_item_s,aes(x=number,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=number, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  #labs("order\npreference")+
  facet_grid(item~.)+
  theme_bw()#+
#ggsave("../results/english-numeral-context-item.png")
context_item_plot

e_QUDi_s = bootsSummary(data=t, measurevar="response", groupvars=c("context","number","QUD","item"))

e_QUDi_plot = ggplot(data=e_QUDi_s,aes(x=number,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=number, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  #labs("order\npreference")+
  facet_grid(item~QUD)+
  theme_bw()#+
#ggsave("../results/english-numeral-item.png")
e_QUDi_plot


#number
summary(lmer(response~context*QUD*number+(1|item),data=t[t$quantifier=="numeral",]))

#every
summary(lmer(response~context*QUD+(1|item),data=t[t$quantifier=="every",]))


e_combined_s = bootsSummary(data=t, measurevar="response", groupvars=c("context","number","QUD","quantifier"))

e_combined_plot = ggplot(data=e_combined_s,aes(x=number,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=number, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  #labs("order\npreference")+
  facet_wrap(quantifier~QUD)+
  theme_bw()#+
e_combined_plot
#ggsave("../results/english-combined.png")



e_quantifier_no_context_s = bootsSummary(data=d[d$quantifier=="every",], measurevar="response", groupvars=c("QUD"))

e_quantifier_no_context_plot = ggplot(data=e_quantifier_no_context_s,aes(x=QUD,y=response))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=QUD, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  ylab("endorsement rate") +
  #labs(fill="early-success")+
  #facet_wrap(~QUD)+
  theme_bw()#+
e_quantifier_no_context_plot + theme(text = element_text(size = 35)) 
ggsave("../Results/english-quantifier-no-context.png")
