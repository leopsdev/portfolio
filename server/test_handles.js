import express from 'express';
const app = express();
const server = app.listen(3001, () => {
  console.log('Listening on 3001');
  console.log('Callback Handles:', process._getActiveHandles().length);
});
console.log('Immediate Handles:', process._getActiveHandles().length);
process.on('beforeExit', () => {
  console.log('beforeExit. Handles:', process._getActiveHandles().length);
});
