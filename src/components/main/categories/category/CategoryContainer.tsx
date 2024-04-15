/**
# "AAA.tsx"

## RENDER AS:
- ``` <example/> ```

## DEPENDENCIES:
| type     | name                                            | role       |
| ---------| ----------------------------------------------- | ---------- |
| PARENT 1 | BBB.tsx                                         | 機能や役割 |
| CHILD  1 | CCC.tsx                                         | 機能や役割 |
| CHILD  2 | DDD.tsx                                         | 機能や役割 |
| PACKAGE  | importしているpackage名                         | 機能や役割 |
| PROVIDER | importしているprovider名                        | 機能や役割 |
| SETTING  | importしているsetting file名                    | 機能や役割 |
| UTILS    | ultils ディレクトリからimportしているファイル名 | 機能や役割 |
| TYPES    | 外部からimportしている型名                      | 機能や役割 |

## FEATURES:
- conponent

## DESCRIPTION:
- コンポーネントが提供する機能や役割を箇条書きで記述する。

## PROPS:
| name        | type | role                     |
| ----------- | ---- | ------------------------ |
| propsの名前 | 型   | 役割などの一言程度の説明 |

## STATES:
| name        | type | role                     |
| ----------- | ---- | ------------------------ |
| stateの名前 | 型   | 役割などの一言程度の説明 |

## FUTURE TASKS:
- 今後の展望や修正点を箇条書きで記述する。

## COPILOT
- copilotからの提案をここに箇条書きで記述する。
*/


/* --- react/styled-components --- */
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
/* --- child components ---------- */
import { Category } from "./Category";
import { CardsContainer } from "./card_view/CardsModal";
import { CategoriesContext } from "../../../../providers/CategoriesProvider";
import { CategoryType } from "../../../../types/Categories";
/* --- dev ----------------------- */
import { isDebugMode } from "../../../../utils/adminDebugMode";

// === TYPE =========================================================== //
// - PROPS
interface PropsType {
  category: CategoryType;
  index: number;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const CategoryContainer: FC<PropsType> = (props) => {
  const { index, ...rest } = props;
  const { activeIdx } = useContext(CategoriesContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (index === activeIdx) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [index, activeIdx]);

  return (
    <StyledDiv>
      <Category { ...props } />
      { isActive && 
        ( <CardsContainer { ...rest }/> )
      }
    </StyledDiv>
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledDiv = styled.div`
`;
// ========================================================= STYLE === //