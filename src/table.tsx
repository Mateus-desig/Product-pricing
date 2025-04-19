import { useEffect, useState } from "react"

type Item = {
    name: string
    desc: string
    value: number
    valueType: string
    calc: string
    all: boolean
}

type JsonData = {
    fixed: Item[]
    pay: Item[]
}

type TableProps = {
    productVal: string
}

function Table({ productVal }: TableProps) {

    const [data, setData] = useState<JsonData | null>(null) // Estado para armazenar os dados.

    // Listar variaveis de calculo.
    useEffect(() => {

        fetch("public/json/config.json").then(res => res.json()).then((json) => {

            setData(json)

        }).catch(err => { console.error("Erro ao carregar o JSON: ", err) })

    }, [])

    productVal = "90"
    let value = parseFloat(productVal)

    return (
        <div className="he-tb">
            <h2 className="title">Calculos de custo de produto</h2>

            <div className="row header">
                <div className="cell">Tipo</div>
                <div className="cell">Descrição</div>
                <div className="cell amount">Valor</div>
            </div>

            {/* Exibindo os dados do 'fixed' e 'pay' */}
            {data?.fixed.length === 0 || data?.pay.length === 0 ? (
                <p>Sem custos fixos.</p>
            ) : (
                <div>
                    {data?.fixed.concat(data?.pay).map((item) => {

                        if (item.calc == "add") value = value + item.value

                        return (

                            <div className="row">
                                <div className="cell">{item.name}</div>
                                <div className="cell">{item.desc} {item.valueType == "%" || item.calc == "sub" ? "-" : "+"} {item.valueType !== "%" ? "R$" : ""} {item.value.toFixed(2)}{item.valueType == "%" ? "%" : ""}</div>
                                <div className="cell amount">R$ {
                                    item.valueType == "%" ? (value * (1 - (item.value / 100))).toFixed(2) :
                                        item.calc == "add" ? value.toFixed(2) :
                                            (value - item.value).toFixed(2)}</div>
                            </div>

                        )
                    })}
                </div>
            )}

            <div className="row">
                <div className="cell">Custo Bruto</div>
                <div className="cell">Valor do Produto com tudo incluido</div>
                <div className="cell amount">R$ {value.toFixed(2)}</div>
            </div>

            <div className="price total">
                <div className="cell">Preço sugerido de venda</div>
                <div className="cell"></div>
                <div className="cell amount">R$ 0.00</div>
            </div>
        </div>
    )

}


export default Table