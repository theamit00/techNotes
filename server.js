import express from "express";
import path from "path"
import root from "./routes/root.js";

const app = express();

const PORT = process.env.PORT || 8080;

// Global middleware
app.use(express.static(path.join(path.resolve(), 'public')))

app.use('/', root)

// handle invalid routes
app.all(/.*/,(req,res)=>{
  res.status(400)
  if(req.accepts('html')){
    res.sendFile(path.join(path.resolve(), 'views', '404.html'));
  }else if(req.accepts('json')){
    res.json({message: '404 not found'})
  }else {
    res.type('txt').send('404 Not Found')
  }
})

// Handle server side error
app.use((err, req,res,next)=>{
  console.log(err)
  res.send('Something went wrong!')
})

app.listen(PORT, ()=>{
  console.log(`Server is runing on http://localhost:${PORT}`);
})