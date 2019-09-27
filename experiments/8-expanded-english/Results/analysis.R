library(ggplot2)
library(reshape2)
library(lme4)
library(dplyr)

setwd("~/git/chinese_scope/experiments/8-expanded-english/Submiterator-master/")

source("../results/helpers.r")

d = read.csv("8-expanded-english-trials.csv",header=T)
s = read.csv("8-expanded-english-subject_information.csv",header=T)

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
d = d[d$language!="",]
#d = d[d$assess=="Yes",]

length(unique(d$workerid)) # n=115 (117)

################################

t = d[d$trial_type=="one_slider"&d$item!="control1"&d$item!="control2"&d$item!="control3",]

e_agg = aggregate(response~context*number*QUD*quantifier,data=t,FUN=mean)
e_agg

table(t$context,t$number,t$QUD,t$quantifier)

e_every_s = bootsSummary(data=t[t$quantifier=="every",], measurevar="response", groupvars=c("context","number","QUD"))

e_every_plot = ggplot(data=e_every_s,aes(x=number,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=number, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  #labs("order\npreference")+
  facet_wrap(~QUD)+
  theme_bw()#+
#ggsave("../results/english-every.png")
e_every_plot

e_numeral_s = bootsSummary(data=t[t$quantifier=="numeral",], measurevar="response", groupvars=c("context","number","QUD"))

e_numeral_plot = ggplot(data=e_numeral_s,aes(x=number,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=number, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  #labs("order\npreference")+
  facet_wrap(~QUD)+
  theme_bw()#+
#ggsave("../results/english-numeral.png")
e_numeral_plot


e_QUDi_s = bootsSummary(data=t, measurevar="response", groupvars=c("context","number","QUD","item"))

e_QUDi_plot = ggplot(data=e_QUDi_s,aes(x=number,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=number, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  #labs("order\npreference")+
  facet_grid(item~QUD)+
  theme_bw()#+
#ggsave("../results/english-QUD-item.png")
e_QUDi_plot


summary(lmer(response~context:number+number+QUD:number+(1|workerid)+(1|item),data=t))
