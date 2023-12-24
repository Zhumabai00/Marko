'use client'
import { Provider } from 'react-redux'
import { setupStore, AppStore } from './store'

export default function StoreProvider({
	children
}: {
	children: React.ReactNode
}) {
	const storeRef = setupStore()

	return <Provider store={storeRef}>{children}</Provider>
}
