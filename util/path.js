import path from "path"

const rootDir = path.resolve();

const pathToFile = (...filePath)=>{
  
  return path.join(rootDir, ...filePath);
}

export {
  rootDir,
  pathToFile
}
