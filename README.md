Hosted On: https://lunfardo.github.io/ultimate-currency-converter/

What this solution contains:

- Currency converter
- Works both ways (left and right)
- Allow you to select the convertion date
- Time-series chart based on selected day (and previous 60 days)
- It is possible to add and remove new conversion box
- Debounced user input
- API caching

Limitations:

- Only works using dates between the past 10 years (otherwise time-series api wont work)
- Time-series is only for the last 60 days, it should be extended to give the user more freedom about the range
- Error handling is visually very limited
- Charts button can be improved
- .env shouldn't be public
- Missing closing button on dialog (use escape key or clicking outside)

Notes

- https://api.exchangeratesapi.io/ doesnt support HTTPS request on the free tier, Github pages enforce HTTPS

Developed By: Ignacio J. Torres
