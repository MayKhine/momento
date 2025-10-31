type ActionButtonProps = {
  text: string
  onClick: () => void
}
export const ActionButton = ({ text, onClick }: ActionButtonProps) => {
  return (
    <button
      className="h-max min-w-max bg-gray-300 p-2 pl-4 pr-4 rounded-l-4xl rounded-r-4xl hover:cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
