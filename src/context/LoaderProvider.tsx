import { ReactNode, createContext, useState } from "react"

export const loaderContext = createContext<{isLoading: boolean, setIsLoading: any}>({isLoading: false, setIsLoading: () => false});

const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <>
      <loaderContext.Provider value={{ isLoading, setIsLoading }}>{children}</loaderContext.Provider>
    </>
  )
}

export default LoaderProvider
