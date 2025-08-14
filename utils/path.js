import path from "path"

const rootDir = path.resolve();

const createPath = (...filePath)=>{
  
  return path.join(rootDir, ...filePath);
}

export {
  rootDir,
  createPath
}
