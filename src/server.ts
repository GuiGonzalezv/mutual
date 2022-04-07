import app from "./app"


app.listen(process.env.PORT || 3000, function() {
    console.log(`App running on port ${process.env.PORT || "3000"}`)
})