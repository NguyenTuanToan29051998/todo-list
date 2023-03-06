import { ShowDropdwonType, ShowValidateType, TaskType } from '@/models/task';
import type { NextPage } from 'next';
import { useState } from 'react';
import { PRIORITY_LIST } from '../../public/const';
import { angleDownIcon, datepickerIcon } from '../../public/icons';
import styles from '../../styles/components/templates/TaskBody.module.scss';
import useFormat from '../../hooks/useFormat';

const TaskBody: NextPage = () => {
  const { formatDate } = useFormat();
  const [formValue, setFormValue] = useState<TaskType>({
    id: 0,
    name: '',
    description: '',
    dueDate: formatDate(new Date().toJSON()),
    priority: 'normal',
  });
  const [formValueDetail, setFormValueDetail] = useState<TaskType>({
    id: 0,
    name: '',
    description: '',
    dueDate: '',
    priority: '',
  });
  const [detailId, setDetailId] = useState<number>(-1);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResult] = useState<TaskType[]>([]);
  const [showValidate, setShowValidate] = useState<ShowValidateType>({
    isCreacte: false,
    isUpdate: false,
  });
  const [showDropdown, setShowDropdown] = useState<ShowDropdwonType>({
    isCreacte: false,
    isUpdate: false,
  });
  const [idSelectedArr, setIdSelectedArr] = useState<number[]>([]);
  const [taskList, setTaskList] = useState<TaskType[]>([
    {
      id: 0,
      name: 'Do home work 1',
      description: 'description 1',
      dueDate: '9 March 2023',
      priority: 'normal',
    },
    {
      id: 1,
      name: 'Do home work 2',
      description: 'description 2',
      dueDate: '12 March 2023',
      priority: 'low',
    },
    {
      id: 2,
      name: 'Do home work 3',
      description: 'description 3',
      dueDate: '15 March 2023',
      priority: 'high',
    },
  ]);

  const handleSelecedPriority = (priority: string, isCreate: boolean) => {
    isCreate ? setFormValue({ ...formValue, priority: priority }) : setFormValueDetail({ ...formValueDetail, priority: priority });
    setShowDropdown({ ...showDropdown, isCreacte: false, isUpdate: false });
  };

  const handleSearch = (event: any) => {
    setSearchInput(event.target.value);
    setSearchResult(taskList.filter(task => task.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())));
  };

  const handleRemoveTask = (id: number) => {
    setTaskList(taskList.filter(task => task.id !== id));
  };

  const handleCreate = () => {
    if (!formValue.name || (new Date(formValue.dueDate) < new Date(new Date().setDate(new Date().getDate() - 1)))) {
      setShowValidate({ ...showValidate, isCreacte: true });
      return;
    }
    const taskValue = {
      ...formValue,
      id: Math.random(),
    };
    setTaskList([...taskList, taskValue]);
    setShowValidate({ ...showValidate, isCreacte: false });
    setFormValue(
      {
        id: 0,
        name: '',
        description: '',
        dueDate: formatDate(new Date().toJSON()),
        priority: 'normal',
      }
    );
  };

  const handleDetail = (id: number) => {
    setDetailId(detailId === id ? -1 : id);
    setFormValueDetail({
      id: id,
      name: taskList.find(item => item.id === id)?.name || '',
      description: taskList.find(item => item.id === id)?.description || '',
      dueDate: taskList.find(item => item.id === id)?.dueDate || '',
      priority: taskList.find(item => item.id === id)?.priority || '',
    });
  };

  const handleUpdate = () => {
    if (!formValueDetail.name || (new Date(formValueDetail.dueDate) < new Date(new Date().setDate(new Date().getDate() - 1)))) {
      setShowValidate({ ...showValidate, isUpdate: true });
      return;
    }
    const objIndex = taskList.findIndex((item => item.id == detailId));
    taskList[objIndex].name = formValueDetail.name;
    taskList[objIndex].description = formValueDetail.description;
    taskList[objIndex].dueDate = formValueDetail.dueDate;
    taskList[objIndex].priority = formValueDetail.priority;
    setTaskList([...taskList]);
  };

  const handleSelectedCheckbox = (id: number) => {
    if (idSelectedArr.some(item => item === id)) {
      setIdSelectedArr(idSelectedArr.filter(item => item !== id));
    } else {
      idSelectedArr.push(id);
      setIdSelectedArr([...idSelectedArr]);
    }
  };

  const handleBulkDelete = () => {
    setTaskList(taskList.filter(item => !idSelectedArr.includes(item.id)));
    setIdSelectedArr([]);
  };

  return (
    <div className={styles.taskBody}>
      <div className={styles.leftArea}>
        <h6 className={styles.title}>New task</h6>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Add new task ..."
          value={formValue.name}
          onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
        />
        {showValidate.isCreacte && !formValue.name && (
          <span className={styles.error}>please enter task name</span>
        )}
        <div className="mt-3">
          <div className={styles.name}>Description</div>
          <textarea
            className={styles.textareaField}
            value={formValue.description}
            onChange={(e) => setFormValue({ ...formValue, description: e.target.value })}
          />
        </div>
        <div className="d-flex gap-4 mt-3 my-2">
          <div>
            <div className={styles.name}>Due date</div>
            <div className="d-flex">
              <input className={styles.inputDate} type="text" readOnly value={formValue.dueDate} />
              <div className={styles.datepicker}>
                <div className={styles.datepickerToggle}>
                  <div className={styles.datepickerToggleButton}>{datepickerIcon}</div>
                  <input
                    className={styles.datepickerInput}
                    type="date"
                    onChange={(e) => setFormValue({ ...formValue, dueDate: formatDate(e.target.value) })}
                  />
                </div>
              </div>
            </div>
            {showValidate.isCreacte && (new Date(formValue.dueDate) < new Date(new Date().setDate(new Date().getDate() - 1))) && (
              <span className={styles.error}>the date is overdue</span>
            )}
          </div>
          <div>
            <div className={styles.name}>Piority</div>
            <div>
              <div className={styles.dropdown}>
                <div className={styles.dropdownMenu}>
                  <input type="text" value={formValue.priority} readOnly />
                  <div
                    className={styles.dropdownMenuIcon}
                    onClick={() => setShowDropdown({ ...showDropdown, isCreacte: !showDropdown.isCreacte })}
                    role="presentation"
                  >
                    {angleDownIcon}
                  </div>
                </div>
                {showDropdown.isCreacte && (
                  <div className={styles.dropdownContent}>
                    {PRIORITY_LIST.map((val, ind) => (
                      <span
                        className={styles.item}
                        key={ind}
                        onClick={() => handleSelecedPriority(val, true)}
                        role="presentation"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <button className={styles.btnAdd} onClick={() => handleCreate()}>Add</button>
      </div>
      <div className={styles.rightArea}>
        <div className={styles.todoList}>
          <h6 className={styles.title}>Todo List</h6>
          <input className={styles.inputField} type="text" placeholder="Search ..." onChange={(e) => handleSearch(e)} onKeyDown={(e) => handleSearch(e)} />
          {((searchInput ? searchResults : taskList) || []).map(item => (
            <>
              <div className={styles.itemWrap}>
                <div className="d-flex gap-4 justify-content-between align-items-center">
                  <div className="d-flex gap-4">
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      onClick={() => handleSelectedCheckbox(item.id)}
                      checked={idSelectedArr.includes(item.id)}
                    />
                    <span>{item.name}</span>
                  </div>
                  <div className="d-flex gap-4">
                    <button className={styles.btnDetail} onClick={() => handleDetail(item.id)}>Detail</button>
                    <button className={styles.btnRemove} onClick={() => handleRemoveTask(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
              {item.id === detailId && (
                <div className={styles.detailWrap}>
                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Add new task ..."
                    value={formValueDetail.name}
                    onChange={(e) => setFormValueDetail({ ...formValueDetail, name: e.target.value })}
                  />
                  {showValidate.isUpdate && !formValueDetail.name && (
                    <span className={styles.error}>please enter task name</span>
                  )}
                  <div className="mt-3">
                    <div className={styles.name}>Description</div>
                    <textarea
                      className={styles.textareaField}
                      value={formValueDetail.description}
                      onChange={(e) => setFormValueDetail({ ...formValueDetail, description: e.target.value })}
                    />
                  </div>
                  <div className="d-flex gap-4 justify-content-between mt-3 my-2">
                    <div>
                      <div className={styles.name}>Due date</div>
                      <div className="d-flex">
                        <input className={styles.inputDate} type="text" readOnly value={formValueDetail.dueDate} />
                        <div className={styles.datepicker}>
                          <div className={styles.datepickerToggle}>
                            <div className={styles.datepickerToggleButton}>{datepickerIcon}</div>
                            <input
                              className={styles.datepickerInput}
                              type="date"
                              onChange={(e) => setFormValueDetail({ ...formValueDetail, dueDate: formatDate(e.target.value) })}
                            />
                          </div>
                        </div>
                      </div>
                      {showValidate.isUpdate && (new Date(formValueDetail.dueDate) < new Date(new Date().setDate(new Date().getDate() - 1))) && (
                        <span className={styles.error}>the date is overdue</span>
                      )}
                    </div>
                    <div>
                      <div className={styles.name}>Piority</div>
                      <div className={styles.dropdown}>
                        <div className={styles.dropdownMenu}>
                          <input type="text" value={formValueDetail.priority} readOnly />
                          <div
                            className={styles.dropdownMenuIcon}
                            onClick={() => setShowDropdown({ ...showDropdown, isUpdate: !showDropdown.isUpdate })}
                            role="presentation"
                          >
                            {angleDownIcon}
                          </div>
                        </div>
                        {showDropdown.isUpdate && (
                          <div className={styles.dropdownContent}>
                            {PRIORITY_LIST.map((val, ind) => (
                              <span
                                className={styles.item}
                                key={ind}
                                onClick={() => handleSelecedPriority(val, false)}
                                role="presentation"
                              >
                                {val}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className={styles.btnAdd} onClick={() => handleUpdate()}>Update</button>
                </div>
              )}
            </>
          ))}
        </div>
        {!!idSelectedArr.length && (
          <div className={styles.bulkAction}>
            <span>Bulk Action:</span>
            <div className="d-flex gap-4">
              <button className={styles.btnDetail} >Done</button>
              <button className={styles.btnRemove} onClick={() => handleBulkDelete()}>Remove</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBody;
