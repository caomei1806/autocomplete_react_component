import './App.scss'
import AutocompleteSearch from './components/AutocompleteSearch'
import { AppProvider } from './context'

function App() {
	return (
		<div className='App'>
			<AppProvider>
				<AutocompleteSearch />
			</AppProvider>
		</div>
	)
}

export default App
