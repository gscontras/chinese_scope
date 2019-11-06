library(ggplot2)
library(reshape2)
library(lme4)
library(dplyr)

setwd("~/git/chinese_scope/experiments/5-QUD/Submiterator-master/")

source("../results/helpers.r")

d = read.csv("5-QUD-trials.csv",header=T)
s = read.csv("5-QUD-subject_information.csv",header=T)

d$language = s$language[match(d$workerid,s$workerid)]
d$describe = s$describe[match(d$workerid,s$workerid)]
d$lived = s$lived[match(d$workerid,s$workerid)]
d$age = s$age[match(d$workerid,s$workerid)]
d$gender = s$gender[match(d$workerid,s$workerid)]
d$proficiency = s$proficiency[match(d$workerid,s$workerid)]
d$outsideLanguage = s$outsideLanguage[match(d$workerid,s$workerid)]
d$homeLanguage = s$homeLanguage[match(d$workerid,s$workerid)]
d$yearsLived = s$yearsLived[match(d$workerid,s$workerid)]
d$comments = s$comments[match(d$workerid,s$workerid)]
d$assess = s$assess[match(d$workerid,s$workerid)]

d_all <- d

# only lived both before and after 8 in Chinese-speaking country
d = d[d$lived=="both8",]
# only 5plus years in Chinese-speaking country
d = d[d$yearsLived=="5plus",]
## only self-describe as Chinese-Chinese
#d = d[d$describe=="ChineseChinese",]
# only Mandarin as native language
d = d[d$language!="粤语"&
        d$language!="United States"&
        d$language!=""&
        d$language!="CANTONESE"&
        d$language!="ENGLISH"&
        d$language!="2"&
        d$language!="你阅读了操作说明"&
        d$language!="潮州"&
        d$language!="中国",]

unique(d$language)
length(unique(d$workerid)) # n=15 (250)

################################

t = d[d$trial_type=="one_slider"&d$item!="control1"&d$item!="control2"&d$item!="control3",]

c_QUD_agg = aggregate(response~context*number*QUD,data=t,FUN=mean)
c_QUD_agg

table(t$context,t$number,t$QUD)

c_QUD_s = bootsSummary(data=t, measurevar="response", groupvars=c("context","number","QUD"))

c_QUD_plot = ggplot(data=c_QUD_s,aes(x=number,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=number, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  #labs("order\npreference")+
  facet_wrap(~QUD)+
  theme_bw()#+
#ggsave("../results/english-early-success.png")
