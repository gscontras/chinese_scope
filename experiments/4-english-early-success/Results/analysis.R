library(ggplot2)
library(reshape2)
library(lme4)
library(dplyr)

setwd("~/git/chinese_scope/experiments/4-english-early-success/Submiterator-master/")

source("../results/helpers.r")

d = read.csv("4-english-early-success-trials.csv",header=T)
s = read.csv("4-english-early-success-subject_information.csv",header=T)

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


# only English as native language
d = d[d$language!="United States"&d$language!="Spanish"&d$language!="Dutch",]

length(unique(d$workerid)) # n=33

################################

t = d[d$trial_type=="one_slider"&d$item!="control1"&d$item!="control2"&d$item!="control3",]

e_agg = aggregate(response~context*number,data=t,FUN=mean)
e_agg

table(t$context,t$number)


