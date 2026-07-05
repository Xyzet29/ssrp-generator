export default function ChatInput({
  chatText,
  setChatText
}) {
  return (
    <div className="card">
      <h3>Chat Log</h3>
      <textarea
        value={chatText}
        onChange={(e) => setChatText(e.target.value)}
        placeholder="Paste your RP chat here..."
      />
    </div>
  )
}