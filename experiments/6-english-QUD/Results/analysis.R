library(ggplot2)
library(reshape2)
library(lme4)
library(dplyr)

setwd("~/git/chinese_scope/experiments/6-english-QUD/Submiterator-master/")

source("../results/helpers.r")

d = read.csv("6-english-QUD-trials.csv",header=T)
s = read.csv("6-english-QUD-subject_information.csv",header=T)

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
d = d[d$language=="English"|d$language=="english"|d$language=="English "|d$language=="ENGLISH",]
#d = d[d$assess=="Yes",]

length(unique(d$workerid)) # n=111 (120)

################################

t = d[d$trial_type=="one_slider"&d$item!="control1"&d$item!="control2"&d$item!="control3",]

e_QUD_agg = aggregate(response~context*number*QUD,data=t,FUN=mean)
e_QUD_agg

table(t$context,t$number,t$QUD)

e_QUD_s = bootsSummary(data=t, measurevar="response", groupvars=c("context","number","QUD"))

e_QUD_plot = ggplot(data=e_QUD_s,aes(x=number,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=number, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  #labs("order\npreference")+
  facet_wrap(~QUD)+
  theme_bw()#+
#ggsave("../results/english-QUD.png")
e_QUD_plot


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
