
type HeaderProps = {
    productVal: string
    onChange: (val: string) => void
}

function Header({ productVal, onChange }: HeaderProps) {


    // Evento input.
    const handlerInput = (e: React.FormEvent<HTMLInputElement>) => {

        const val = e.currentTarget.value

        // Permitir apenas numeros e pontos.
        if (/^\d*\.?\d*$/.test(val) || val === "") onChange(val)

    }

    return (
        <div className="he-ct">
            <div className="title-he">Preço do produto</div>
            <div className="ct-ip">
                <div className="type">R$</div>
                <input className="pdt-vl" type="text" onInput={handlerInput} value={productVal} placeholder="Preço de produção do produto" />
            </div>
        </div>
    )

}


export default Header