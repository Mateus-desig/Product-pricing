import React, { useState } from 'react'

type HeaderProps = {
    productVal: string
    onChange: (val: string) => void
}

function Header({ productVal, onChange }: HeaderProps) {

    // Estado para controlar a porcentagem de lucro.
    const [profitPercentage, setProfitPercentage] = useState<string>("")

    // Evento de input para o campo "Preço de produção do produto".
    const handlerInput = (e: React.FormEvent<HTMLInputElement>) => {

        const val = e.currentTarget.value

        // Permitir apenas números e pontos.
        if (/^\d*\.?\d*$/.test(val) || val === "") {
            onChange(val)
        }

    }

    // Evento de input para o campo "Porcentagem de lucro".
    const handleProfitPercentageChange = (e: React.FormEvent<HTMLInputElement>) => {

        const val = e.currentTarget.value

        if (/^\d*\.?\d*$/.test(val) || val === "") {

            setProfitPercentage(val)

            // Calcular o valor final baseado no preço de produção e na porcentagem.
            if (productVal && val !== "") {
                const productionPrice = parseFloat(productVal)
                const profit = parseFloat(val)
                const finalPrice = productionPrice + (productionPrice * profit / 100)
                onChange(finalPrice.toFixed(2)) // Atualiza o preço final com 2 casas decimais.
            }

        }

    }

    return (
        <div className="he-ct">

            <div className="inputs">

                <div>
                    <div className="title-he">Preço do produto</div>

                    <div className="ct-ip">
                        <div className="type">R$</div>
                        <input
                            className="pdt-vl"
                            type="text"
                            onInput={handlerInput}
                            onFocus={() => setProfitPercentage("")}
                            placeholder="Preço de produção do produto"
                        />
                    </div>
                </div>

                <div>
                    <div className="title-he">Porcentagem de lucro</div>
                    <div className="ct-ip">
                        <div className="type">%</div>
                        <input
                            className="pdt-pc"
                            type="text"
                            onInput={handleProfitPercentageChange}
                            value={profitPercentage}
                            placeholder="Porcentagem de lucro"
                        />
                    </div>

                </div>
            </div>

        </div>

    )
}

export default Header
