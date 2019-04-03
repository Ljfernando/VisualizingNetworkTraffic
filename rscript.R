library(tidyverse)
library(ggplot2)
library(magrittr)

df <- read.csv("computer_security.csv")

df %>% 
  mutate(date = as.Date(date)) %>% 
  group_by(date, l_ipn) %>% 
  summarize(num = sum(f), num_unique = length(unique(r_asn))) %>% 
  group_by(l_ipn) %>%
  summarize(min = min(num), top = quantile(num, probs=0.95))
df %>% 
  mutate(date = as.Date(date)) %>% 
  group_by(date, l_ipn) %>% 
  summarize(num = sum(f), num_unique = length(unique(r_asn))) %>% 
  group_by(l_ipn) %>%
  summarize(med = quantile(num, probs=0.5))
df %>% 
  mutate(date = as.Date(date)) %>% 
  mutate(min=min(date), max=max(date))
  
df %>% 
  mutate(date = as.Date(date)) %>% 
  group_by(date, l_ipn) %>% 
  summarize(val = sum(f)) %>% 
  write.csv('grouped.csv', row.names = F)
  