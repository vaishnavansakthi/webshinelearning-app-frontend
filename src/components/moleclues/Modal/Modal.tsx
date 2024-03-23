const Modal = ({
  title,
  children
}: {
  title: string
  handleCloseModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  children: React.ReactNode
}) => {
  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white dark:bg-[#404040] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            {/* Modal content */}
            <div className="bg-white dark:bg-[#404040] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-[#ffffff]" id="modal-title">
                    {title}
                  </h3>
                  {children}
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
