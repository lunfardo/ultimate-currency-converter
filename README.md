Hosted On: https://lunfardo.github.io/ultimate-currency-converter-dev/

What is here:

- Currecy converter
- Works both ways (left and right)
- Allow you to select a date for convertion
- Time series chat based on selected day (and previous 60 days)
- It is possible to add and remove new conversion box
- Debounced user input
- API caching

Limitations:

- Only works using dates between the last 10 years (otherwise time series api wont work)
- Time series is only for the last 60 days, it should be extended to give the user more freedom about the range
- Error handling is visually very limited
- Charts button can be improved
- .env shouldn't be public

Notes

- https://api.exchangeratesapi.io/ doesnt support HTTPS request on the free tier, Github pages enforce HTTPS

Developed By: Ignacio J. Torres
