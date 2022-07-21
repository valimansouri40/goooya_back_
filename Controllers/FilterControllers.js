const Filter = require("../ModelsControllers/FilterModels");
const Filterrh = require("../ModelsControllers/FilterModelsrh");
const { CatchAsync } = require("../Utils/CatchAsync");
const price= [
{value: '&Mortgage[gte]=500000000&Mortgage[lte]=1000000000', text:'500 میلیون'},
{value: '&Mortgage[gte]=1000000000&Mortgage[lte]=2000000000', text:'1میلیارد'},
{value: '&Mortgage[gte]=2000000000&Mortgage[lte]=5000000000', text:'2 میلیارد'},
{value: '&Mortgage[gte]=5000000000&Mortgage[lte]=10000000000', text:'5 میلیارد'}
,{value:'&Mortgage[gte]=10000000000&Mortgage[lte]=20000000000', text:'10میلیارد'},
{value: '&Mortgage[gte]=20000000000&Mortgage[lte]=50000000000', text:'20 میلیارد'},
{value: '&Mortgage[gte]=50000000000&Mortgage[lte]=100000000000', text:'50 میلیارد'},
{value: '&Mortgage[gte]=100000000000&Mortgage[lte]=200000000000', text:'100 میلیارد'}
,{value: '&Mortgage[gte]=200000000000&Mortgage[lte]=300000000000', text:'200 میلیارد'},
{value: '&Mortgage[gte]=300000000000', text:'بیشتر از 300 میلیارد'}]

const Measure=[{value:'&Measure[lte]=50', text:'کمتر از 50'}
,{value:'&Measure[gte]=50&Measure[lte]=70', text:'60متر'},
{value:'&Measure[gte]=70&Measure[lte]=80', text:'70متر'},
{value:'&Measure[gte]=80&Measure[lte]=90', text:'80متر'},
{value:'&Measure[gte]=90&Measure[lte]=100', text:'90متر'},
{value:'&Measure[gte]=100&Measure[lte]=120', text:'100متر'},
{value:'&Measure[gte]=120&Measure[lte]=140', text:'120متر'},
{value:'&Measure[gte]=140&Measure[lte]=160', text:'140متر'},
{value:'&Measure[gte]=160', text:'بیشتر از 160 متر'},]

const YearBuild=[
    {value:'&YearBuild[lte]=2', text:' کمتر از 2 سال'},
    {value:'&YearBuild[gte]=2&YearBuild[lte]=5', text:'بین 2 تا 5 سال'},
    {value:'&YearBuild[gte]=5&YearBuild[lte]=10', text:'بیت 5 تا 10 سال'},
    {value:'&YearBuild[gte]=10&YearBuild[lte]=15', text:'بین 10 تا 15 سال'},
    {value:'&YearBuild[gte]=15&YearBuild[lte]=20', text:'بین 15 تا 20 سال'},
    {value:'&YearBuild[gte]=20', text:'بیش تر از 20 سال' }
]
exports.GetFilter= CatchAsync(async(req, res)=>{
                
        const exist= await Filter.findOne();

                if(!exist){
            await Filter.create({YearBuild:YearBuild, Price:price, Measure:Measure})
        }
            const filter= await Filter.findOne();
            res.status(200).json({
                status:'succes',
                data: filter
            })
           
})

const price1= [
{value: '&Mortgage[gte]=100000000&Mortgage[lte]=300000000', text:' از 100 میلیون تا 300 میلیون'},
{value: '&Mortgage[gte]=300000000&Mortgage[lte]=600000000', text:'از 300 میلیون تا 600 میلیون'},
{value: '&Mortgage[gte]=600000000&Mortgage[lte]=1000000000', text:'از 600 میلیون تا 1 میلیارد'},
{value: '&Mortgage[gte]=1000000000&Mortgage[lte]=2000000000', text:'از 1 میلیارد تا 2 میلیارد'}
,{value:'&Mortgage[gte]=2000000000&Mortgage[lte]=3000000000', text:'از 2 میلیارد تا 3 میلیارد'},
{value: '&Mortgage[gte]=3000000000&Mortgage[lte]=5000000000', text:'از 3 میلیارد تا 5 میلیارد'},
{value: '&Mortgage[gte]=5000000000&Mortgage[lte]=10000000000', text:'از 5 میلیارد تا 10 میلیارد'},
{value: '&Mortgage[gte]=10000000000', text:'بیشتر از 10 میلیارد'}]

const Lease= [
{value: '&Lease[lte]=5000000', text:'پایین تر از 5 میلیون'},
{value: '&Lease[gte]=5000000&Lease[lte]=10000000', text:'از 5 میلیون تا 10 میلیون'},
{value: '&Lease[gte]=10000000&Lease[lte]=20000000', text:'از 10 میلیون تا 20 میلیون'},
{value: '&Lease[gte]=20000000&Lease[lte]=40000000', text:'از 20 میلیون تا 40 میلیون'}
,{value:'&Lease[gte]=40000000&Lease[lte]=70000000', text:'از 40 میلیون تا 70 میلیون'},
{value: '&Lease[gte]=70000000', text:'بیشتر از 70 میلیون'}]


exports.GetFilterrh= CatchAsync(async(req, res)=>{
    
    const exist= await Filterrh.findOne();
    //  await Filterrh.deleteMany();
    if(!exist){
        await Filterrh.create({YearBuild:YearBuild, Price:price1, Measure:Measure, Lease:Lease})}
        const filter= await Filterrh.findOne();
        
        res.status(200).json({
            status:'succes',
            data: filter
        })

})