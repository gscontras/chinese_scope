library(ggplot2)
library(reshape2)
library(lme4)
library(dplyr)

setwd("~/git/chinese_scope/experiments/13-chinese-goal-manipulation/results/")

source("helpers.r")

d = read.csv("results.csv",header=T)


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
        d$language!="2"&
        d$language!="你阅读了操作说明"&
        d$language!="潮州"&
        d$language!="中国"&
        d$language!="廣東話"&
        d$language!="Cantonese"&
        d$language!="吴语",]
unique(d$language)

length(unique(d$participant_id)) # n=61 (107)

################################






e_quantifier_s = bootsSummary(data=d, measurevar="response", groupvars=c("QUD"))

e_quantifier_plot = ggplot(data=e_quantifier_s,aes(x=QUD,y=response))+
  geom_bar(stat="identity",color="black",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=QUD, width=0.1),position=position_dodge(0.9))+
  ylim(0,1)+
  ylab("endorsement rate") +
  #labs(fill="early-success")+
  #facet_wrap(~QUD)+
  theme_bw()#+
e_quantifier_plot
#ggsave("chinese-quantifier.png",width=2.5,height=1.6)


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