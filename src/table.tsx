import { useEffect, useState } from "react"

type Item = {
    name: string
    desc: string
    value: number
    valueType: string
    calc: string
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

    return (
        <div className="he-tb">
            <h2 className="title">Calculos de custo de produto</h2>

            <div className="row header">
                <div className="cell">Tipo</div>
                <div className="cell">Descrição</div>
                <div className="cell amount">Valor</div>
            </div>

            {/* Exibindo os dados do 'fixed' */}
            {data?.fixed.length === 0 ? (
                <p>Sem custos fixos.</p>
            ) : (
                <div>
                    {data?.fixed.map((item) => (

                        <div className="row">
                            <div className="cell">{item.name}</div>
                            <div className="cell">{item.desc}</div>
                            <div className="cell amount">R$ {
                                item.valueType == "%" ? (parseFloat(productVal) * (1 - (item.value / 100))).toFixed(2) :
                                    item.calc == "add" ? parseFloat(productVal) + item.value :
                                        parseFloat(productVal) - item.value}</div>
                        </div>

                    ))}
                </div>
            )}

            <div className="price total">
                <div className="cell">Preço sugerido de venda</div>
                <div className="cell"></div>
                <div className="cell amount">R$ 0.00</div>
            </div>
        </div>
    )

}


export default Table