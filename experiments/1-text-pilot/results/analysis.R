library(ggplot2)
library(reshape2)
library(lme4)
library(dplyr)

setwd("~/git/chinese_scope/experiments/1-text-pilot/Submiterator-master/")

source("../results/helpers.r")

d = read.csv("1-text-pilot-trials.csv",header=T)
s = read.csv("1-text-pilot-subject_information.csv",header=T)

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
d = d[d$language!="廣東話"&d$language!="马拉雅拉姆语"&d$language!="",]

length(unique(d$workerid)) # n=8

################################

t = d[d$trial_type=="one_slider"&d$item!="control1"&d$item!="control2"&d$item!="control3",]

c_agg = aggregate(response~context*number,data=t,FUN=mean)
c_agg
