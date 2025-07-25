import { createContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: string,
    description: string,
    type: 'income' | 'outcome',
    price: number,
    category: 'string',
    createdAt: string
}

interface CreateTransactionInput {
    description: string,
    price: number,
    category: string,
    type: 'income' | 'outcome',
}

interface TransactionsContextType {
    transactions: Transaction[],
    fetchTransactions: (query?: string) => Promise<void>,
    createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionProviderProps {
    children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])
    
    async function fetchTransactions(query?: string) {
        const response = await api.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query,
            }
        })

        setTransactions(response.data)
    }

    async function createTransaction(data: CreateTransactionInput) {
        const { description, price, category, type } = data

        const response = await api.post('transactions', {
            description,
            price,
            category,
            type,
            createdAt: new Date(),
        })

        setTransactions(state => [ response.data, ...state ])
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
            createTransaction
        }}>
            {children}
        </TransactionsContext.Provider>
    )

}