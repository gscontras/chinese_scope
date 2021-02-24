library(ggplot2)
#library(reshape2)
library(lme4)
#library(dplyr)

setwd("~/git/chinese_scope/experiments/13-chinese-goal-manipulation/results/")

source("helpers.r")

d = read.csv("results.csv",header=T)

nrow(d) #149, recruited 140 through Prolific

unique(d$language)

# only lived both before and after 8 in Chinese-speaking country
d = d[d$lived=="both8",]
# only 5plus years in Chinese-speaking country
d = d[d$yearsLived=="5plus",]
# only Mandarin as native language
d = d[d$language!="粤语"&
        d$language!="United States"&
        d$language!=""&
        d$language!="CANTONESE"&
        d$language!="ENGLISH"&
        d$language!="English"&
        d$language!="四川话"&
        d$language!="2"&
        d$language!="你阅读了操作说明"&
        d$language!="潮州"&
        d$language!="中国"&
        d$language!="廣東話"&
        d$language!="Cantonese"&
        d$language!="吴语",]
unique(d$language)

length(unique(d$participant_id)) # n=79 (107)

################################

e_quantifier_s = bootsSummary(data=d, measurevar="response", groupvars=c("QUD"))

e_quantifier_s$QUD <- factor(e_quantifier_s$QUD,levels=c("none","many","all"))

e_quantifier_no_context_plot = ggplot(data=e_quantifier_s,aes(x=QUD,y=response))+
  geom_bar(stat="identity", fill = c("#d87609","#b58a08", "#879b04"),color = "black", position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=QUD, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  ylab("human endorsement\n") +
  xlab("\nQUD") +
  #labs(fill="early-success")+
  #facet_wrap(~QUD)+
  theme_bw()
e_quantifier_no_context_plot #+ theme(text = element_text(size = 25))   
#ggsave("chinese-quantifier.png",height=2,width=2.5)






## fitting a model to predict results

d$QUD <- factor(d$QUD,levels=c("many","all","none"))

summary(lmer(response~QUD+(1|item),data=d))
