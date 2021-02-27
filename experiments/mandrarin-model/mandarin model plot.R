library(ggplot2)
library(reshape2)
library(dplyr)

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
#ggsave("~/Desktop/mandarin-model.png",height=2,width=2.5)
