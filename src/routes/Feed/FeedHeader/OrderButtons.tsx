import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"
import useDropdown from "src/hooks/useDropdown"
import { MdExpandMore } from "react-icons/md"

type TOrder = "newest" | "oldest" | "name"
const orderOptions: TOrder[] = ["newest", "oldest", "name"]

type Props = {}

const OrderButtons: React.FC<Props> = () => {
  const router = useRouter()
  const [dropdownRef, opened, handleOpen] = useDropdown()

  const currentOrder = `${router.query.order || ``}` || ("newest" as TOrder)

  const handleClickOrderBy = (value: TOrder) => {
    router.push({
      query: {
        ...router.query,
        order: value,
      },
    })
  }
  return (
    <StyledWrapper>
      <div ref={dropdownRef} className="wrapper" onClick={handleOpen}>
        {currentOrder} <MdExpandMore />
      </div>
      {opened && (
        <div className="content">
          {orderOptions.map((key, idx) => (
            <div
              className="item"
              key={idx}
              onClick={() => handleClickOrderBy(key)}
            >
              {key}
            </div>
          ))}
        </div>
      )}
    </StyledWrapper>
  )
}

export default OrderButtons

const StyledWrapper = styled.div`
  position: relative;
  > .wrapper {
    display: flex;
    margin-top: 0.5rem;
    gap: 0.25rem;
    align-items: center;
    font-size: 1.0rem;
    line-height: 1.25rem;
    font-weight: 500;
    cursor: pointer;
  }
  > .content {
    position: absolute;
    z-index: 40;
    padding: 0.25rem;
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.colors.gray2};
    color: ${({ theme }) => theme.colors.gray10};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    > .item {
      padding: 0.25rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      white-space: nowrap;
      cursor: pointer;

      :hover {
        background-color: ${({ theme }) => theme.colors.gray4};
      }
    }
  }
`
