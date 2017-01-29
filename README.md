# Node-Autocomplete with in memory Fuzzy Search (Cron scheduler to read from database to filesystem) 
Implementing Fuzzy search and autocomplete Node.js (Express and pm2)

1. Improved existing fuzzy search logic to get better performance.(~20k reocrds 150 msec).
2. Cron job will read Database in every 6 hours and rows will be dumped as json file, which will be read and served after fuzzy scores are calculated.
3. Fuzzy lowers threshold are kept to hit the sweet spot.
4. Tokenizer could be enbaled to improve better results but performance will be degraded.
