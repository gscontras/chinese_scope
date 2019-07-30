library(ggplot2)
library(reshape2)
library(lme4)
library(dplyr)

setwd("~/git/chinese_scope/experiments/2-text-pilot/Submiterator-master/")

source("../results/helpers.r")

d = read.csv("2-text-pilot-trials.csv",header=T)
s = read.csv("2-text-pilot-subject_information.csv",header=T)

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


# only lived both before and after 8 in Chinese-speaking country
d = d[d$lived=="both8",]
# only 5plus years in Chinese-speaking country
d = d[d$yearsLived=="5plus",]
## only self-describe as Chinese-Chinese
#d = d[d$describe=="ChineseChinese",]
# only Mandarin as native language
d = d[d$language!="粤语"&d$language!="United States"&d$language!="",]

length(unique(d$workerid)) # n=13

################################

t = d[d$trial_type=="one_slider"&d$item!="control1"&d$item!="control2"&d$item!="control3",]

c_agg = aggregate(response~context*number,data=t,FUN=mean)
c_agg

table(t$context,t$number)

c_s = bootsSummary(data=t, measurevar="response", groupvars=c("context","number"))

c_plot = ggplot(data=c_s,aes(x=number,y=response,fill=context))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=number, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  #labs("order\npreference")+
  theme_bw()#+
#ggsave("../results/chinese.png")