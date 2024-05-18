import React from 'react';
import styled from 'styled-components';
import { TodoType } from '../../../../../providers/types/categories';
import { TodoHeader } from './TodoHeader';
import { SlidableParams } from '../../../../../functions/slidable/types';
import { Slidable, SlidableHidden, SlidableMain } from '../../../../../functions/slidable/Components';
import { ArrowUpward, DeleteOutline } from '@mui/icons-material';
import { useDispatch, useWindowSizeSelector } from '../../../../../providers/redux/store';
import { deleteTodo, updateTodoProps } from '../../../../../providers/redux/slices/categoriesSlice';
import { vw2px } from '../../../../../utils/converters';
import { useSlidableRegister } from '../../../../../functions/slidable/Hooks';
import { isTouchDevice } from '../../../../../data/constants/constants';
import { ControlPanel } from '../../../../common/list_control_panel/ControlPanel';
import { archivedListCommon, marginBetweenLiEls } from '../../../../../globalStyle';

interface ArchivedTodoProps {
    key: string;
    activeTodoIdx: number;
    todo: TodoType;
    isGloballyDragging: boolean;
}

export const ArchivedTodo = (props: ArchivedTodoProps) => {
    const { todo, isGloballyDragging } = props;
    const isOpen = todo.isOpen;
    const dispatch = useDispatch();

    // slidable hook
    const { contentsWidth, device } = useWindowSizeSelector();
    const btnsContainerWidth = vw2px(contentsWidth) * 0.33;
    const SLIDABLE_LENGTH = btnsContainerWidth;
    const SLIDABLE_PARAMS: SlidableParams = { SLIDABLE_LENGTH };
    const { isSlided, slide, unSlide, addSlidableBtn, register } = useSlidableRegister({
        params: SLIDABLE_PARAMS,
    });

    // handlers
    const handleUnarchiveBtnClick = () => {
        dispatch(updateTodoProps({ todoId: todo.id, update: { isArchived: false } }));
    };
    const handleDeleteBtnClick = () => {
        const ok = confirm('Are you sure you want to delete this todo?');
        if (ok) dispatch(deleteTodo({ todoId: todo.id }));
    };

    return (
        <StyledLi>
            <Slidable {...register}>
                <SlidableMain className="archive-slidable-main">
                    {/* spサイズのタッチデバイスでは非表示 / pcでもタッチデバイスならリサイズで小さくなっている場合には非表示 */}
                    {!(isTouchDevice && device === 'sp') && (
                        <ControlPanel
                            attrs={['slide']}
                            isGloballyDragging={isGloballyDragging}
                            isOpen={isOpen}
                            slide={{ isSlided, slide, addSlidableBtn }}
                        />
                    )}
                    <TodoHeader
                        attributes={'archived'}
                        todo={props.todo}
                        isGloballyDragging={props.isGloballyDragging}
                    />
                </SlidableMain>

                <SlidableHidden
                    className="btns-container"
                    slidableLength={SLIDABLE_LENGTH}
                >
                    <button
                        className="btn btn-unarchive"
                        onClick={handleUnarchiveBtnClick}
                    >
                        <ArrowUpward />
                    </button>
                    <button
                        className="btn btn-delete"
                        onClick={handleDeleteBtnClick}
                    >
                        <DeleteOutline />
                    </button>
                </SlidableHidden>
            </Slidable>
        </StyledLi>
    );
};

const StyledLi = styled.li`
    ${marginBetweenLiEls()}
    ${archivedListCommon({ type: 'todo' })}

    /* width: var(--archived-todo-width); */

    .archive-slidable-main {
        display: flex;
        width: 100%;
    }

    .btns-container {
        display: flex;

        .btn {
            display: block;
            width: 100%;
            margin: 0.2rem;
            border: var(--border-1);
            border-radius: 0.2rem;
            svg {
                color: tomato;
                font-size: 2rem;
            }
        }
        .btn:active {
            scale: 0.95;
            transition: scale 100ms;
        }

        .btn-unarchive {
        }
        .btn-delete {
            border-color: tomato;
        }
    }
`;
