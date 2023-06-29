
export default function Button({ handleButton, text, clases, type = 'button' }) {
    return (
        <div>
            <button type={type} onClick={handleButton} className={clases} > {text} </button>
        </div>
    )
}
