import { EventEmitter } from 'events';

import mangekyouConstant from './../constant/mangekyouConstant';
import mangekyouDispatcher from './../dispatcher/mangekyouDispatcher';

const CHANGE_EVENT = {
  HISTORY: 'HISTORY',
  PREVIEW: 'PREVIEW',
  SHOWING: 'SHOWING',
};

const _store = {
  history: [],
  previewImage: null,
  showing: {
    historyPanel: true,
    toolPanel: true,
  },
};

function addHistory({operation, image}) {
  _store.history.push({operation, image});
  _store.previewImage = image;
}

function loadHistory(index) {
  if ( _store.history.slice(-1)[0].operation === '历史跳转') {
    _store.history.pop();
  }
  addHistory({
    operation: '历史跳转',
    image: _store.history[index].image,
  });
}

function updatePreviewImage(image) {
  _store.previewImage = image;
}

function newImage(image) {
  addHistory({
    operation: '打开文件',
    image,
  });
}

function triggerShowing(componentName) {
  _store.showing[componentName] = !_store.showing[componentName];
}

const mangekyouStore = Object.assign({}, EventEmitter.prototype, {
  addHistoryChangeListener(cb) {
    this.on(CHANGE_EVENT.HISTORY, cb);
  },
  removeHistoryChangeListener(cb) {
    this.removeListener(CHANGE_EVENT.HISTORY, cb);
  },
  getHistory() {
    return _store.history;
  },
  getLastHistory() {
    return _store.history.length > 0 ? _store.history.slice(-1)[0] : null;
  },
  addPreviewImageChangeListener(cb) {
    this.on(CHANGE_EVENT.PREVIEW, cb);
  },
  removePreviewImageChangeListener(cb) {
    this.removeListener(CHANGE_EVENT.PREVIEW, cb);
  },
  getPreviewImage() {
    return _store.previewImage;
  },
  addShowingChangeListener(cb) {
    this.on(CHANGE_EVENT.SHOWING, cb);
  },
  removeShowingChangeListener(cb) {
    this.removeListener(CHANGE_EVENT.SHOWING, cb);
  },
  getShowing() {
    return _store.showing;
  },
});

mangekyouDispatcher.register(payload => {
  const {data, actionType} = payload.action;
  switch (actionType) {
  case mangekyouConstant.ADD_HISTORY:
    addHistory(data);
    mangekyouStore.emit(CHANGE_EVENT.HISTORY);
    break;
  case mangekyouConstant.LOAD_HISTORY:
    loadHistory(data);
    mangekyouStore.emit(CHANGE_EVENT.PREVIEW);
    mangekyouStore.emit(CHANGE_EVENT.HISTORY);
    break;
  case mangekyouConstant.NEW_IMAGE:
    newImage(data);
    mangekyouStore.emit(CHANGE_EVENT.PREVIEW);
    mangekyouStore.emit(CHANGE_EVENT.HISTORY);
    break;
  case mangekyouConstant.UPDATE_PREVIEW:
    updatePreviewImage(data);
    mangekyouStore.emit(CHANGE_EVENT.PREVIEW);
    break;
  case mangekyouConstant.TRIGGER_SHOWING:
    triggerShowing(data);
    mangekyouStore.emit(CHANGE_EVENT.SHOWING);
    break;
  default:
    return true;
  }
});

export default mangekyouStore;