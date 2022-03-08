import {
    useCallback
} from "react";
import {
    saveAs
} from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";

const FILE_TYPES = {
    CSV: 'csv',
    PDF: 'pdf',
}

function toCSV(data:Array<Array<string>>) {
    if(!data?.length){
        return ''
    }
    return data.join('\n')
}

function toPDF(data: Array<Array<string>>) {
    if(!data?.length){
        return {}
    }
    const head = data.shift()!

    return {
        head:[head],
        body:data
    }
}

function useExport() {
    const handleSetExport = useCallback(
        (data = '', type = FILE_TYPES.CSV, filename = 'table') => {
            if (type === FILE_TYPES.CSV) {
                const blob = new Blob(['\uFEFF' + toCSV(data)], {
                    type: 'text/plain;charset=utrf-8'
                });
                return saveAs(blob, `${filename}.${type}`)
            }else if(type === FILE_TYPES.PDF){
                const doc = new jsPDF()
                autoTable(doc, toPDF(data))

                return doc.save(`${filename}.${type}`)
            }
            return null
        },
        [],
    )

    return {
        setExport: handleSetExport
    }
}

export default useExport;