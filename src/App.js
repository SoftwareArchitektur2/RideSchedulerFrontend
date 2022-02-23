import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import AppRouter from './AppRouter';

function App() {
  return <>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <AppRouter />
    </LocalizationProvider>
  </>;
}

export default App;
