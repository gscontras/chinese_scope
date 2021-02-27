library(ggplot2)
library(reshape2)
library(dplyr)

setwd("~/git/chinese_scope/model/plots/")

### Yongjia's model

d = data.frame(
  utterance = c("every-not", "not-every", "null"),
  response = c(0.20559517317318024, 0.514642694630954, 0.27976213219586576)
)

alternative = ggplot(d, aes(x = utterance, y = response, fill = utterance)) +
  geom_bar(stat="identity", color = "black", position=position_dodge())+
  ylim(0,1)+
  ylab("endorsement rate\n") +
  xlab("\nutterances") +
  theme_bw()

alternative + theme(legend.position = "none")
#ggsave("yongjia-mandarin-model.png",height=2,width=2.5)



## LSA proceedings model



#NONE
#"null" : 0.49249081506887055
#"not-every-dou" : 0.4789122966546648
#"every-dou-not" : 0.02859688827646454

#MANY
#"not-every-dou" : 0.7704396786713373
#"null" : 0.20438177307762367
#"every-dou-not" : 0.025178548251038855

#ALL
#"not-every-dou" : 0.46385044060874375
#"every-dou-not" : 0.40862986887953395
#"null" : 0.12751969051172204


d = data.frame(
  QUD = c("none", "many", "all"),
  response = c(0.02859688827646454, 0.025178548251038855, 0.40862986887953395)
)


d$QUD <- factor(d$QUD,levels=c("none","many","all"))

alternative = ggplot(d, aes(x = QUD, y = response, fill = QUD)) +
  geom_bar(stat = "identity",fill = c("#d87609","#b58a08", "#879b04"),color ="black", position=position_dodge())+ 
  ylim(0,1)+
  ylab("model endorsement\n") +
  xlab("\nQUD")+
  theme_bw()

alternative + theme(legend.position = "none")
#ggsave("mandarin-model.png",height=2,width=2.5)

