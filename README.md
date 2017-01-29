# Node-Autocomplete
Implementing Fuzzy search and autocomplete Node.js (Express and pm2)

1. Express api exposed for fuzzy search used node modules for fuzzy search and modified core to improve performance.
2. Cron job will read Database in every 6 hours and rows will be dumped as json file, which will be read and served after fuzzy scores are calculated.
3. Fuzzy lowers threshold are kept to hit the sweet spot.
4. Tokenizer can be enbaled to improve better results but performance will be degraded.
