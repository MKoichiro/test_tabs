import React from 'react';
import styled from 'styled-components';
import { TodoType } from '../../../../../providers/types/categories';
import { TodoHeader } from './TodoHeader';
import { SlidableParams } from '../../../../../functions/slidable/types';
import {
    Slidable,
    SlidableHidden,
    SlidableMain,
} from '../../../../../functions/slidable/Components';
import { ArrowUpward, DeleteOutline } from '@mui/icons-material';
import { useDispatch, useWindowSizeSelector } from '../../../../../providers/redux/store';
import { deleteTodo, updateTodoProps } from '../../../../../providers/redux/slices/categoriesSlice';
import { vw2px } from '../../../../../utils/converters';
import { useSlidableRegister } from '../../../../../functions/slidable/Hooks';

interface ArchivedTodoProps {
    key: string;
    activeTodoIdx: number;
    todo: TodoType;
    isGloballyDragging: boolean;
}

export const ArchivedTodo = (props: ArchivedTodoProps) => {
    const { todo } = props;
    const dispatch = useDispatch();

    // slidable hook
    const { contentsWidth } = useWindowSizeSelector();
    const btnsContainerWidth = vw2px(contentsWidth) * 0.33;
    const SLIDABLE_LENGTH = btnsContainerWidth;
    const SLIDABLE_PARAMS: SlidableParams = { SLIDABLE_LENGTH };
    const { isSlided, slide, unSlide, register } = useSlidableRegister({
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
                <SlidableMain>
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
    margin-top: 0.8rem;
    background-color: var(--color-white-3);
    border-radius: 0.2rem;
    width: 95%;
    margin: 1.6rem auto;

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
